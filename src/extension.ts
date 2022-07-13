'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.openJunkfile', () => {
        const date = new Date();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
        const junkPath = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}-${date.getHours()}h${minutes}m${seconds}s.`;
        const pathLength = junkPath.length                         

        vscode.window.showInputBox({
            placeHolder:'junkfile path', 
            value: junkPath, 
            valueSelection: [pathLength, pathLength]
        }).then((filename) => {
            if(filename === undefined) { return false; }

            const baseDir = vscode.workspace.getConfiguration('junkfile').get('dir');
            const path = process.env.HOME + '/' + baseDir + '/' + filename;
            openTextDocument('untitled:', path);
        });
    });

    context.subscriptions.push(disposable);
}

export function openTextDocument(schrma, path) {
    const uri = vscode.Uri.parse(schrma+path);
    vscode.workspace.openTextDocument(uri).then((textDoc)=> { 
        vscode.window.showTextDocument(textDoc, vscode.ViewColumn.One);
    }, 
    (error)=> {
        openTextDocument('file:', path);
    });
}

export function deactivate() {}
