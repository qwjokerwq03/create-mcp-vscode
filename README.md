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

## 🛠️ Requirements & Setup

This extension wraps your local **`create-mcp`** parsing engine.
*   Ensure **Python 3** is installed and accessible via the `python3` command.
*   Ensure the local script `/Users/thapan/create-mcp/check_swagger.py` exists and is executable.

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
