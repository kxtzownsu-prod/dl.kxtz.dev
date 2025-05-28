# dl.kxtz.dev
My file host! :3

## Running / Building
### Setup
First, you need to make sure you have **`pnpm`** installed, if you have `npm` already its as easy as:
```
sudo npm i -g pnpm
```
Otherwise, follow the instructions on pnpm.io for your distro

### Actually running ts
Now that everything is set up, we can run the server
```
pnpm install # required


pnpm run dev    # IF YOU WANT TO HOST VIA AUTORELOAD / VITE
-------------------
pnpm run build  # IF YOU WANT TO HOST VIA NGINX /  APACHE
```
(If you do `pnpm run build`, the files will be in `dist/`)

## Credits
kxtzownsu - all of it