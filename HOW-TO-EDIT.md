# Site Edit Karne Ki Guide (How to Edit This Site)

## ⭐ Sab se asaan: Admin Panel

Site ka apna admin panel hai — **`/admin`** par jayen (e.g. `https://your-site.vercel.app/admin`):

- **Login**: apna admin password dalen (Vercel → Project → Settings → Environment Variables → `ADMIN_PASSWORD` me change kar sakte hain)
- **Projects tab**: saare portfolio projects — Edit / Delete buttons ke sath
- **+ Add Project tab**: naam, live link, platform, category, description likhen, screenshot upload karen → project foran portfolio me aa jata hai
- **Analytics tab**: kitne log site dekh rahe hain (daily views, top pages)

Changes save hone ke baad 1 minute ke andar live site par dikhte hain — koi deploy nahi karna parta.

## Text change karna

Saara text **ek file me hai**: `lib/data.js`

| Kya change karna hai | Kahan |
|----------------------|-------|
| Naam, phone, email, location | `lib/data.js` → sab se upar `profile` section |
| Skills (WordPress 95% waghera) | `lib/data.js` → `skills` |
| Job experience | `lib/data.js` → `experience` |
| Education | `lib/data.js` → `education` |
| Services ka text | `lib/data.js` → `services` |
| Portfolio projects (naam, link, description) | `lib/data.js` → `projects` |
| Blog articles | `lib/data.js` → `blogPosts` |

Bas text ko quotes `"..."` ke andar badlen. Comma aur brackets ko mat cheren.

## Naya project add karna

`lib/data.js` me `projects` list ke andar yeh block copy kar ke paste karen aur details badlen:

```js
{
  name: "Site Ka Naam",
  url: "https://site-ka-link.com/",
  image: "/shots/site-ka-screenshot.webp",
  category: "E-commerce",
  platform: "WordPress",   // ya "Shopify" ya "GoHighLevel"
  description: "Ek line me site ki description.",
},
```

Screenshot `public/shots/` folder me `.webp` format me rakhen (width ~640px, height max 1920px best hai).

## Images change karna

| Image | File |
|-------|------|
| Profile photo | `public/profile.jpg` (isi naam se nayi photo rakh den) |
| Portfolio screenshots | `public/shots/*.webp` (same naam se replace karen) |
| CV | `public/Shaheer-CV.pdf` (isi naam se naya CV rakh den) |

## Changes live kaise karen

**GitHub + Vercel connected ho to:** GitHub par file edit kar ke Commit karen — Vercel khud deploy kar dega (1-2 minute).

**Apne computer se:**

```bash
npm install        # sirf pehli baar
npm run dev        # local preview: http://localhost:3000
npx vercel --prod  # live deploy (Vercel login poochega)
```
