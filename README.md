# Demo Translator API

```js
const translator = await Translator.create({sourceLanguage: 'en', targetLanguage: 'fr'})
await translator.translate($0.innerText)
```

- Ref:
https://bsky.app/profile/tomayac.com/post/3lzlaf5kpq22x
https://github.com/bluesky-social/social-app/pull/9070

# Demo Summarize API

```js
const summarizer = await Summarizer.create()
await summarizer.summarize($0.innerHTML)
```

# Demo Prompt API

Start app with
```bash
npm run dev
```

Connect to http://localhost:5173/