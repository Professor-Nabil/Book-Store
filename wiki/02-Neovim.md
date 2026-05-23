1. Make sure you have the HTML parser

```vim
:TSInstall html
```

1. Map `.ejs` to HTML dynamically

```lua
-- ~/.config/nvim/lua/config/autocmds.lua
vim.filetype.add({
  extension = {
    ejs = "html",
  },
})
```

Restart Neovim, re-open your `views/index.ejs`.
The syntax engine will treat it perfectly as a standard web layout—bringing full Tailwind,
script tags, and structural styling code to life instantly with your custom theme colors!
