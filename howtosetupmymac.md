# Setting Up My Mac

## Homebrew

Homebrew belongs on every Mac. If you're not running homebrew we can still be friends but I'll be suspicious of any drink you offer me. Until I see a better way, homebrew is essential.

https://brew.sh/

Get homebrew running straight away so you can use commands like 

```bash 
brew install exa
```

wich is similar to `ls` but gives custom colors to files and derectories colors:

![Screenshot 2023-11-11 at 5.13.57 PM](./public/assets/Screenshot%202023-11-11%20at%205.13.57%20PM.jpg)

## `cowsay`

```bash
# a fun way to have an ACII cow say whatever you want
# <Your Command> | cowsay
brew install cowsay 
```

e.g.

```bash
exa | cowsay
```

will print out:

```bash
 ______________________________________ 
/ client howtosetupmymac.md LICENSE    \
| node_modules package-lock.json       |
\ package.json public README.md server /
 -------------------------------------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## `ohmyzsh`

Get  Oh My Z-shell installed. Seriously it's a game changer.

```
# Every unix system should have oh my z-shell running...
# https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh

sh -c "$(curl fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## [Powerlevel10k](https://github.com/romkatv/powerlevel10k#powerlevel10k)

https://github.com/romkatv/powerlevel10k#installation



## Command-line Fuzzy Finder

https://github.com/junegunn/fzf#installation\



I like the dark frosted glass look so my terminal background gets opacity turned down and blur turned up...

![Screenshot 2023-11-11 at 5.14.18 PM](./public/assets/Screenshot%202023-11-11%20at%205.14.18%20PM.jpg)



I have a lot of convenience aliases and my HOME path gets decorated for Android and JDK, this might not be necessary. I really don't know. It's kind of a set it and forget it deal.

![Screenshot 2023-11-11 at 5.15.28 PM](./public/assets/Screenshot%202023-11-11%20at%205.15.28%20PM.jpg)
