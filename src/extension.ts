import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "create-mcp-vscode" is now active!');

    // Command 1: Right-click on a folder in Explorer
    let generateFromFolder = vscode.commands.registerCommand('create-mcp.generateFromFolder', async (uri: vscode.Uri) => {
        if (!uri || !uri.fsPath) {
            vscode.window.showErrorMessage('Error: No target folder selected.');
            return;
        }

        const folderPath = uri.fsPath;
        const folderName = path.basename(folderPath);

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Scanning codebase "${folderName}" and creating MCP Server...`,
            cancellable: false
        }, async (progress) => {
            return new Promise<void>((resolve, reject) => {
                // Command to call the local Python parsing engine
                const checkSwaggerScript = '/Users/thapan/create-mcp/check_swagger.py';
                const command = `python3 "${checkSwaggerScript}" --url "${folderPath}"`;

                cp.exec(command, { cwd: folderPath }, (error, stdout, stderr) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Failed to scan codebase: ${error.message}`);
                        reject(error);
                        return;
                    }

                    // Look for generated_mcp script
                    const generatedFile = path.join(folderPath, `generated_mcp_${folderName}.py`);
                    if (fs.existsSync(generatedFile)) {
                        vscode.window.showInformationMessage(
                            `Success! Auto-generated custom MCP Server file created at:\n${generatedFile}`,
                            'Open File'
                        ).then(selection => {
                            if (selection === 'Open File') {
                                vscode.workspace.openTextDocument(generatedFile).then(doc => {
                                    vscode.window.showTextDocument(doc);
                                });
                            }
                        });
                    } else {
                        // Display stdout report (could be standard check report)
                        vscode.window.showInformationMessage('Scan complete! Check stdout for report details.');
                    }
                    resolve();
                });
            });
        });
    });

    // Command 2: Triggered via command palette, prompts user for URL
    let generateFromUrl = vscode.commands.registerCommand('create-mcp.generateFromUrl', async () => {
        const inputUrl = await vscode.window.showInputBox({
            prompt: 'Enter the target documentation URL or public GitHub repository URL to scan',
            placeHolder: 'https://petstore.swagger.io/v2/swagger.json or https://github.com/expressjs/express'
        });

        if (!inputUrl) {
            return;
        }

        // Determine destination folder (default to current open workspace folder)
        let destFolder = '/Users/thapan';
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            destFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Scanning "${inputUrl}"...`,
            cancellable: false
        }, async (progress) => {
            return new Promise<void>((resolve, reject) => {
                const checkSwaggerScript = '/Users/thapan/create-mcp/check_swagger.py';
                const command = `python3 "${checkSwaggerScript}" --url "${inputUrl}"`;

                cp.exec(command, { cwd: destFolder }, (error, stdout, stderr) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Failed to scan URL: ${error.message}`);
                        reject(error);
                        return;
                    }

                    // Scan stdout to find generated file name
                    const match = stdout.match(/generated_mcp_[a-zA-Z0-9_\-]+\.py/);
                    if (match) {
                        const fileName = match[0];
                        const generatedFile = path.join(destFolder, fileName);
                        
                        vscode.window.showInformationMessage(
                            `Success! Auto-generated custom MCP Server file created at:\n${generatedFile}`,
                            'Open File'
                        ).then(selection => {
                            if (selection === 'Open File') {
                                vscode.workspace.openTextDocument(generatedFile).then(doc => {
                                    vscode.window.showTextDocument(doc);
                                });
                            }
                        });
                    } else {
                        // Renders report in standard output
                        const channel = vscode.window.createOutputChannel('Create MCP Report');
                        channel.appendLine(stdout);
                        channel.show();
                    }
                    resolve();
                });
            });
        });
    });

    context.subscriptions.push(generateFromFolder);
    context.subscriptions.push(generateFromUrl);
}

export function deactivate() {}
