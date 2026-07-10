# How to Publish the Laive AI Website on Vercel

**For someone with zero coding experience. Follow each step in order. You cannot break anything.**

Your website is made of plain files. There is **nothing to "build" or compile** — Vercel just needs to host the folder. Total time: about **15 minutes**. It is **free**.

You'll do three things:
1. Get the website files onto your computer (a ZIP).
2. Put them on GitHub (a free file locker Vercel can read).
3. Connect Vercel to GitHub and click Deploy.

---

## Before you start — make 2 free accounts

1. **GitHub** → go to **github.com**, click **Sign up**. Use your email, pick a username and password. (This stores your files.)
2. **Vercel** → go to **vercel.com**, click **Sign Up**, and choose **"Continue with GitHub."** This links the two automatically. Say **Authorize** when asked.

> Tip: Keep both browser tabs open. You'll bounce between them.

---

## Step 1 — Download the website files

1. In this app, download the whole project as a **ZIP** (use the **Download** button / "Download project"). Save it somewhere easy, like your **Desktop**.
2. Find the ZIP file (e.g. `laive-ai.zip`) and **unzip it**:
   - **Windows:** right‑click → **Extract All** → **Extract**.
   - **Mac:** double‑click it.
3. You now have a **folder** with the files inside (you'll see `index.html`, `styles.css`, folders like `assets`, `ui_kits`, etc.). Remember where this folder is.

✅ *Checkpoint: you have an unzipped folder that contains a file called `index.html`.*

---

## Step 2 — Put the files on GitHub (no coding, all in the browser)

1. Go to **github.com** and log in.
2. Top‑right, click the **+** icon → **New repository**.
3. **Repository name:** type `laive-ai-website`.
4. Leave everything else default. Make sure it's **Public** (or Private — both work). Click **Create repository**.
5. On the next page, click the link **"uploading an existing file"** (it's in the middle of the page).
6. Open your unzipped folder from Step 1. **Select everything inside it** (Ctrl+A on Windows / Cmd+A on Mac) and **drag it all** into the GitHub upload area in your browser.
   - ⚠️ Important: drag the **contents** of the folder (the `index.html`, `assets`, `ui_kits`, …), **not** the outer folder itself. GitHub should show a long list of files uploading.
7. Wait for every file to finish uploading (you'll see them listed).
8. Scroll to the bottom and click the green **Commit changes** button.

✅ *Checkpoint: your GitHub repository page now shows `index.html` and the other files/folders.*

---

## Step 3 — Deploy on Vercel

1. Go to **vercel.com** and log in (with GitHub).
2. Click **Add New…** → **Project**.
3. You'll see a list of your GitHub repositories. Find **`laive-ai-website`** and click **Import**.
4. Vercel shows a "Configure Project" screen. **You don't need to change anything.** Specifically:
   - **Framework Preset:** leave as **Other** (if it isn't already, pick **Other**).
   - **Build Command:** leave **blank / empty**.
   - **Output Directory:** leave as default (`./`).
   - **Root Directory:** leave as `./`.
5. Click the big **Deploy** button.
6. Wait ~30–60 seconds. You'll see confetti 🎉 and a **"Congratulations"** screen with a preview of your site.
7. Click **Visit** (or **Continue to Dashboard** → **Visit**). Your Laive AI website is now live on the internet!

Your free address will look like: **`https://laive-ai-website.vercel.app`**

✅ *Checkpoint: clicking Visit opens the full Laive AI site (the intro counter, then the hero).* 

> Why it just works: opening the site's home address automatically forwards to the actual page at `ui_kits/website-flagship/`. That's handled by the `index.html` at the top level — you don't need to do anything.

---

## Step 4 (Optional) — Use your own domain, e.g. `laiveai.com`

1. In Vercel, open your project → **Settings** (top menu) → **Domains** (left menu).
2. Type your domain (e.g. `laiveai.com`) and click **Add**.
3. Vercel shows you a few **DNS records** (some names and numbers).
4. Log in wherever you **bought the domain** (GoDaddy, Namecheap, etc.), find **DNS settings**, and **copy Vercel's records in**. (Vercel has a "copy" button next to each.)
5. Save. It can take a few minutes to a few hours to activate. Vercel shows a green check when it's ready.

If you're unsure, Vercel's on‑screen instructions for your specific domain company are excellent — follow those.

---

## How to update the site later

Whenever you want to change the website:
1. Go to your **GitHub** repository.
2. Click the file you want to change (or click **Add file → Upload files** to replace files).
3. Make your edit / upload, then click **Commit changes**.
4. **Vercel automatically re‑deploys within a minute.** No extra steps. Refresh your live site to see the change.

---

## If something looks wrong

- **Blank page / just a spinner?** Wait 5–10 seconds on first load (it prepares the page). Then refresh once.
- **"404 Not Found"?** You likely uploaded the outer folder instead of its contents. In GitHub, make sure `index.html` sits at the **top level** of the repository (not inside another folder). Re‑upload the *contents* if needed.
- **Booking calendar doesn't appear?** It loads from Cal.com; if a visitor blocks it, they'll see an **"Open booking page"** button that still works. Nothing to fix.
- **Images missing?** Make sure the `assets` folder uploaded to GitHub (it should be at the top level next to `index.html`).

---

### That's it 🎉
You now have a live, professional Laive AI website — and updating it is just "upload to GitHub → it redeploys itself." Welcome online.
