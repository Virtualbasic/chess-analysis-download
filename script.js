// ==UserScript==
// @name         Pobieranie analizy partii na chess.com
// @namespace    -
// @version      0.1
// @description  Pobierz analizę partii w formie pliku HTML z CSS
// @author       Silki
// @match        https://www.chess.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function downloadAnalysis() {
        const element = document.querySelector('.sidebar-tab-content-component[data-cy="sidebar-selected-tab-review"]');
        if (!element) {
            return; 
        }

        const htmlContent = element.innerHTML;

        const cssContent = Array.from(document.styleSheets)
            .map(sheet => Array.from(sheet.cssRules || []).map(rule => rule.cssText).join('\n'))
            .join('\n');

        const fullHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                ${cssContent}
            </style>
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
        `;

       
        const downloadButton = document.createElement('a');
        downloadButton.innerText = 'Pobierz analizę';
        downloadButton.setAttribute('href', `data:text/html;charset=utf-8,${encodeURIComponent(fullHTML)}`);
        downloadButton.setAttribute('download', 'analiza.html');

        element.appendChild(downloadButton);
    }

 
    window.addEventListener('load', function() {
      
        setTimeout(function() {
          
            downloadAnalysis();
        }, 20000); 
    });
})();