// ==UserScript==
// @name         dofus-wiki-travel-helper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A Tampermonkey script for converting coordinates on Dofus Wiki into clickable links that copy travel commands to the clipboard.
// @author       Cz34an
// @match        https://dofuswiki.fandom.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
    'use strict';

    function replaceCoordinatesWithLinks() {
        const coordRegex = /(\[-?\d+,-?\d+\])/g;

        const body = document.body;

        function showToast(message) {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '30px';
            toast.style.backgroundColor = '#333';
            toast.style.color = '#9ff000';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '5px';
            toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
            toast.style.fontSize = '14px';
            toast.style.zIndex = '10000';
            toast.style.opacity = '1';
            toast.style.transition = 'opacity 0.5s ease';

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }

        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const matches = text.match(coordRegex);

                if (matches) {
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;

                    matches.forEach(match => {
                        const index = text.indexOf(match, lastIndex);

                        if (index > lastIndex) {
                            fragment.appendChild(document.createTextNode(text.slice(lastIndex, index)));
                        }

                        const coords = match.match(/-?\d+/g);
                        const link = document.createElement('a');
                        link.href = '#';
                        link.textContent = match;

                        link.addEventListener('click', function (event) {
                            event.preventDefault();
                            const command = `/travel ${coords[0]} ${coords[1]}`;
                            GM_setClipboard(command);
                            showToast(`Copied: ${command}`);
                        });

                        fragment.appendChild(link);
                        lastIndex = index + match.length;
                    });

                    if (lastIndex < text.length) {
                        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
                    }

                    node.replaceWith(fragment);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                Array.from(node.childNodes).forEach(processNode);
            }
        }

        processNode(body);
    }

    window.addEventListener('load', replaceCoordinatesWithLinks);
})();