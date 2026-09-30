Welcome to my personal website! I will occasionally update this website with entries about my hobbies and various thoughts for documentation purposes.

The creation of this portfolio website was largely inspired by the following friends and engineers. Thank you [Joanna Y](https://hachiyuki8.com/blog/), [Lee R](https://leerob.com/), [Andrew L](https://www.andrewlee03.dev/), [Tejas G](https://tejasgupta.com/), [William L](https://williamlin.io/), [Katherine Z](https://kzeng24.github.io/personal-website/), and [Max S](https://thenumb.at/)!
## Notebook interface

The site uses a monochrome notebook layout with a collapsible directory. Folder names open directory pages; their adjacent `+`/`−` controls expand the tree. Existing articles and photo pages remain available, and `/blog` URLs redirect to `/writing`.

- `npm ci` installs the locked dependencies.
- `npm run dev` serves the development site on port 3000.
- `npm run build` verifies and builds production; `npm start` serves it.
- `npx vitest run test/unit/lib/filesystem.test.ts test/unit/components/NotebookShell.test.tsx test/unit/app/page.test.tsx` checks notebook navigation, commands, shortcuts, and the homepage.

Press **Cmd+J** (Mac) or **Ctrl+J** (Windows/Linux), or use the terminal button. The bottom panel supports `help`, `ls`, `cd`, `open`, `pwd`, `home`, `clear`, `exit`, `light`, and `dark`. This is a browser-only site navigator. Theme preference is saved locally. Examples:

```text
cd ~/writing
ls
open small-changes.md
cd ../resources
cd cooking
ls
```

Page routes, directory entries, and post dates are defined in `src/lib/filesystem.ts`. Add an article page and its metadata there to expose it in both the sidebar and terminal. Posts on the writing page are sorted newest first.
