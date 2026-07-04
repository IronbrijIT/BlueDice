import{a as e}from"./rolldown-runtime-CNC7AqOf.js";import{t}from"./react-9ZasmZpi.js";import{t as n}from"./jsx-runtime-DiK4U9sA.js";import{n as r,t as i}from"./copy-Dy930-yg.js";import{t as a}from"./chevron-left-DgBnLJ1g.js";import{P as o,U as s,a as c}from"./index-BgQr9E1R.js";import{t as l}from"./PageShell-CikcSW_E.js";import{t as u}from"./reflection-BtprkddR.js";var d=o(`circle-question-mark`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),f=o(`terminal`,[[`path`,{d:`M12 19h8`,key:`baeox8`}],[`path`,{d:`m4 17 6-6-6-6`,key:`1yngyt`}]]),p=e(t()),m=n();function h(){let[e,t]=(0,p.useState)(null),n=(e,n)=>{navigator.clipboard.writeText(e),t(n),c.success(`Copied to clipboard!`),setTimeout(()=>t(null),2e3)},o=u,h=`{
  "meta": {
    "instanceId": "bluedice-instance"
  },
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "blue-dice-sync",
        "responseMode": "onReceived",
        "options": {}
      },
      "id": "trigger-webhook",
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "model": "gpt-4o-mini",
        "options": {
          "temperature": 0.7
        }
      },
      "id": "openai-llm",
      "name": "OpenAI Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1,
      "position": [450, 450]
    },
    {
      "parameters": {
        "promptType": "custom",
        "systemMessage": "=${o}",
        "userMessage": "=User Prompt: {{ $json.body.prompt || 'None' }}\\nTimestamp: {{ $json.body.at }}"
      },
      "id": "llm-node",
      "name": "AI Reflection Generator",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.4,
      "position": [450, 300]
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [
        [
          {
            "node": "AI Reflection Generator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Reflection Generator",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  }
}`;return(0,m.jsxs)(l,{children:[(0,m.jsxs)(s,{to:`/profile`,className:`mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition`,children:[(0,m.jsx)(a,{className:`h-4 w-4`}),` Back to Profile`]}),(0,m.jsx)(`h1`,{className:`text-[30px] font-bold text-foreground tracking-tight`,children:`n8n Integrations`}),(0,m.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:`Connect Blue Dice to your self-hosted or cloud n8n workflows for custom AI actions, quotes, and notifications.`}),(0,m.jsxs)(`div`,{className:`mt-6 rounded-2xl bg-card border border-border p-5 shadow-sm`,children:[(0,m.jsxs)(`h2`,{className:`text-base font-semibold text-foreground flex items-center gap-2`,children:[(0,m.jsx)(f,{className:`h-4 w-4 text-primary`}),` Workflow Overview`]}),(0,m.jsx)(`p`,{className:`mt-2 text-xs leading-relaxed text-muted-foreground`,children:`By wiring up n8n webhooks, you can replace the app's default offline/mock reflections with real-time AI generation. When you roll the dice, Blue Dice sends a request to your webhook. n8n invokes an AI node, saves history, and returns the reflection directly to your web app or mobile companion.`})]}),(0,m.jsx)(`h2`,{className:`mt-8 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground`,children:`1. AI System Prompt`}),(0,m.jsxs)(`div`,{className:`rounded-2xl bg-card border border-border p-4 relative overflow-hidden`,children:[(0,m.jsxs)(`div`,{className:`flex items-center justify-between mb-3 border-b border-border pb-2`,children:[(0,m.jsx)(`span`,{className:`text-xs font-semibold text-foreground`,children:`LangChain/LLM Node System Message`}),(0,m.jsx)(`button`,{onClick:()=>n(o,`prompt`),className:`rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition`,"aria-label":`Copy prompt`,children:e===`prompt`?(0,m.jsx)(r,{className:`h-4 w-4 text-green-500`}):(0,m.jsx)(i,{className:`h-4 w-4`})})]}),(0,m.jsx)(`pre`,{className:`text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre-wrap max-h-60`,children:o})]}),(0,m.jsx)(`h2`,{className:`mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground`,children:`2. Workflow Template (JSON)`}),(0,m.jsxs)(`div`,{className:`rounded-2xl bg-card border border-border p-4 relative overflow-hidden`,children:[(0,m.jsxs)(`div`,{className:`flex items-center justify-between mb-3 border-b border-border pb-2`,children:[(0,m.jsx)(`span`,{className:`text-xs font-semibold text-foreground`,children:`Import into n8n canvas`}),(0,m.jsx)(`button`,{onClick:()=>n(h,`workflow`),className:`rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition`,"aria-label":`Copy workflow`,children:e===`workflow`?(0,m.jsx)(r,{className:`h-4 w-4 text-green-500`}):(0,m.jsx)(i,{className:`h-4 w-4`})})]}),(0,m.jsx)(`p`,{className:`text-xs text-muted-foreground mb-3`,children:`Copy this JSON code and paste it directly into your n8n workspace to instantiate a starter reflection flow.`}),(0,m.jsx)(`pre`,{className:`text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre max-h-48`,children:h})]}),(0,m.jsx)(`h2`,{className:`mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground`,children:`3. Web & App Push Notifications`}),(0,m.jsxs)(`div`,{className:`rounded-2xl bg-card border border-border p-4 space-y-4`,children:[(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`h3`,{className:`text-xs font-semibold text-foreground`,children:`Web Push (VAPID Keys)`}),(0,m.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground`,children:`To configure push reminders when the tab is closed, run the following terminal command to get VAPID keys:`}),(0,m.jsxs)(`div`,{className:`mt-2 bg-secondary p-2 rounded-xl text-[11px] font-mono flex items-center justify-between`,children:[(0,m.jsx)(`span`,{className:`text-foreground`,children:`npx web-push generate-vapid-keys`}),(0,m.jsx)(`button`,{onClick:()=>n(`npx web-push generate-vapid-keys`,`cmd`),className:`text-muted-foreground hover:text-foreground p-1`,children:e===`cmd`?(0,m.jsx)(r,{className:`h-3 w-3 text-green-500`}):(0,m.jsx)(i,{className:`h-3 w-3`})})]}),(0,m.jsx)(`p`,{className:`mt-2 text-[11px] text-muted-foreground`,children:`Put the public key in your app profile notifications settings, and use the private key inside your n8n Web Push Node to deliver browser and app native notifications!`})]}),(0,m.jsxs)(`div`,{className:`border-t border-border pt-3`,children:[(0,m.jsxs)(`h3`,{className:`text-xs font-semibold text-foreground flex items-center gap-1`,children:[(0,m.jsx)(d,{className:`h-3 w-3 text-primary`}),` Multiplatform Support`]}),(0,m.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground`,children:"The webhook payload includes the user's `deviceId` and authenticated `userId`. In n8n, you can route the output to a **Discord/Telegram webhook**, or to a **Firebase Cloud Messaging (FCM)** node to push notifications to Android/iOS companion apps."})]})]})]})}export{h as component};