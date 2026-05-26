# 🔍 Create MCP VS Code Extension (`create-mcp-vscode`)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Model Context Protocol](https://img.shields.io/badge/Protocol-MCP-blue.svg)](https://modelcontextprotocol.io/)

A premium VS Code extension that integrates the **`create-mcp`** static analysis engine directly into your workspace. Right-click any backend codebase folder or enter a documentation URL to instantly auto-generate a fully compliant, runnable Python Model Context Protocol (MCP) server for that API!

---

## ✨ Features

### 1. File Explorer Right-Click Context Menu
*   Right-click any folder in the VS Code File Explorer.
*   Select **`Create MCP: Generate Server from Folder`**.
*   The extension will automatically scan the project files, analyze routing patterns (Express, FastAPI, Flask, Django, Spring Boot), map all REST paths, and generate a customized `generated_mcp_<folder>.py` server file inside that folder!

### 2. Command Palette URL Scanner
*   Open the VS Code Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux).
*   Type and select: **`Create MCP: Generate Server from URL...`**.
*   Input any online API documentation (Swagger/OpenAPI JSON/YAML) or a public GitHub repository link (e.g. `https://github.com/spring-projects/spring-petclinic`).
*   The extension will crawl, scan, and save the custom synthesized MCP server to your current workspace!

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- **Python 3**: Ensure Python 3 is installed on your local system and is accessible via the `python3` command in your terminal.
- **check_swagger.py**: Ensure the core codebase parsing script exists locally at `/Users/thapan/create-mcp/check_swagger.py`.

### 2. Quick Installation (VSIX)
You can install the extension instantly without publishing it online:
1. Open **VS Code**.
2. Open the **Extensions panel** (`Cmd+Shift+X` on Mac / `Ctrl+Shift+X` on Windows/Linux).
3. Click the **`...`** (three dots) icon at the top right of the Extensions sidebar.
4. Select **`Install from VSIX...`**.
5. Select the packaged file: `/Users/thapan/create-mcp-vscode/create-mcp-vscode-1.0.0.vsix`.

---

## 💻 How to Use It

### Method A: Explorer Context Menu (Local Folders)
1. Open a workspace containing your backend project in VS Code.
2. In the Explorer sidebar, **right-click** your project folder (or specific router directory).
3. Click **`Create MCP: Generate Server from Folder`**.
4. The extension will scan your files in the background and write a fully operational `generated_mcp_<foldername>.py` server file directly into that folder!

### Method B: Command Palette (Documentation or GitHub URLs)
1. Open the VS Code Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`).
2. Search and select **`Create MCP: Generate Server from URL...`**.
3. Input any public Swagger documentation URL (JSON/YAML) or a public GitHub link (e.g. `https://github.com/spring-projects/spring-petclinic`).
4. The extension will automatically synthesize the endpoints and save the `generated_mcp_<name>.py` inside your active workspace.

---

## ⚡ Running the Generated MCP Servers
Every generated script is a standard, fully compliant MCP server. To register it with your AI assistant (e.g. Gemini, Antigravity, or Claude), add the generated file path to your local `mcp_config.json`:

```json
{
  "mcpServers": {
    "my-custom-mcp": {
      "command": "python3",
      "args": [
        "/path/to/your/generated_mcp_xxx.py"
      ]
    }
  }
}
```

---

## 💻 Development & Testing

If you want to run or modify this extension locally:

1.  Open the `/Users/thapan/create-mcp-vscode` directory in VS Code.
2.  Press **`F5`** (or go to *Run and Debug* panel and click *Run Extension*).
3.  This opens an **Extension Development Host** window containing a test sandbox.
4.  Right-click any folder inside the explorer in that test window to verify the context menu behaves correctly!

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
