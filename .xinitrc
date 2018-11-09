#set a nice backgroundm'gv``.
xsetroot -solid "#636f7d"

!clickable links
URxvt.perl-ext-common: default,matcher
URxvt.url-launcher: /usr/bin/xdg-open
URxvt.matcher.button: 1

#fonts
xset +fp /home/nathaniel/.fonts
xset fp rehash

#merge Xresources
xrdb -load ~/.Xresources

#PA
start-pulseaudio-x11 &


#wm
exec 2bwm 

