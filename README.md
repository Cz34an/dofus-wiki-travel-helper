# Dofus Travel Helper

A Tampermonkey script that enhances the [Dofus Wiki](https://dofuswiki.fandom.com/) by converting coordinates (e.g., **[-5,-4]**) into clickable links. Clicking these links copies a **/travel** command (e.g., **/travel -5 -4**) directly to your clipboard, making your travels in Dofus much easier.

## Features

* Automatically detects coordinates in the format [-x,-y] on the Dofus Wiki.
* Converts them into clickable links.
* Copies the corresponding /travel x y command to your clipboard when clicked.

## Installation

To use this script, you'll need a userscript manager like Tampermonkey. Follow the instructions below to install and start using the script.

### Step 1: Install a Userscript Manager

Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.

### Step 2: Install the Script

1. Open your userscript manager (Tampermonkey).
2. Click on "Create a new script".
3. Copy the contents of the **script.js** file into the editor.
4. Save the script (Ctrl+S or click the save icon).

### Step 3: Use the Script

Navigate to the [Dofus Wiki](https://dofuswiki.fandom.com/).

The script will automatically detect coordinates in the format **[-x,-y]**.

Click on a coordinate link to copy the **/travel** command to your clipboard.

## Screenshots

![img.png](images/img.png)
![img_1.png](images/img_1.png)

### License

This project is licensed under the MIT License - see the LICENSE file for details.
