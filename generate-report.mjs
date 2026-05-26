// process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// const { execSync } = require('child_process');
// const fs = require('fs');
// // We use the standard cross-platform packages
// const { GoogleGenAI } = require('@google/genai');
// const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

// async function generateWeeklyReport() {
//     try {
//         // Look for the API key in the environment or an adjacent .env file
//         const apiKey = process.env.GEMINI_API_KEY;
        
//         if (!apiKey) {
//             console.error("❌ Error: GEMINI_API_KEY not found!");
//             console.log("Please make sure a .env.local file with your key is in this folder.");
//             // Keep window open on Windows if they double-clicked it
//             process.stdin.read(); 
//             return;
//         }

//         const ai = new GoogleGenAI({ apiKey: apiKey });

//         console.log("📊 Extracting Git logs from the past 7 days...");
//         const gitLogCommand = 'git log --since=1.week.ago --pretty=format:"- %ad: %s (%an)" --date=short';
//         const rawGitLogs = execSync(gitLogCommand).toString().trim();

//         if (!rawGitLogs) {
//             console.log("⚠️ No commits found in the last 7 days. Make some edits and commit them first!");
//             process.stdin.read();
//             return;
//         }

//         console.log("🤖 Sending logs to Gemini to generate the report structure...");

//         const prompt = `
//         You are an expert Agile Product Manager. Analyze this raw list of git commit logs from a software project over the past week.
//         Your job is to translate these technical commits into a comprehensive weekly status report for management. Do NOT use any markdown syntax or formatting tokens in your response (no asterisks, no hash symbols, no backticks). Write purely in plain text paragraphs and plain bullet points.
        
//         Structure the output into these exact sections using plain text uppercase headers:
//         CURRENT PROJECT STATE
//         WORK DONE THIS WEEK
//         JIRA USER STORIES
//         SUCCESSES
//         POSSIBLE IMPROVEMENTS

//         Here are the git commits:
//         ${rawGitLogs}
//         `;

//         const response = await ai.models.generateContent({
//             model: 'gemini-2.5-flash',
//             contents: prompt,
//         });

//         const aiText = response.text;
//         console.log("📄 Generating clean Microsoft Word document...");

//         const textLines = aiText.split('\n');
//         const docParagraphs = [
//             new Paragraph({ text: "Weekly Project Status & Jira Report", heading: HeadingLevel.HEADING_1, spacing: { after: 120 } }),
//             new Paragraph({ text: `Generated on: ${new Date().toLocaleDateString()}`, spacing: { after: 400 } })
//         ];

//         const targets = ['CURRENT PROJECT STATE', 'WORK DONE THIS WEEK', 'JIRA USER STORIES', 'SUCCESSES', 'POSSIBLE IMPROVEMENTS'];

//         textLines.forEach(line => {
//             const cleanLine = line.trim();
//             if (cleanLine === '') return;
            
//             if (targets.includes(cleanLine)) {
//                 docParagraphs.push(new Paragraph({ text: cleanLine, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 120 } }));
//             } else {
//                 docParagraphs.push(new Paragraph({ children: [new TextRun(cleanLine)], spacing: { after: 120 } }));
//             }
//         });

//         const doc = new Document({ sections: [{ properties: {}, children: docParagraphs }] });
//         const buffer = await Packer.toBuffer(doc);
//         const fileName = `Weekly_Report_${new Date().toISOString().split('T')[0]}.docx`;
        
//         fs.writeFileSync(fileName, buffer);
//         console.log(`\n✅ Success! Your expanded report is ready: ${fileName}`);
//         console.log("Press Enter to close this window.");
        
//     } catch (error) {
//         console.error("❌ Something went wrong:", error);
//     }
// }

// generateWeeklyReport();