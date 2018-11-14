#set a nice backgroundm'gv``.
xsetroot -solid "#636f7d"

#fonts
xset +fp /home/nathaniel/.fonts
xset fp rehash

#merge Xresources
xrdb -load ~/.Xresources

#PA
start-pulseaudio-x11 &


#wm
exec 2bwm 

