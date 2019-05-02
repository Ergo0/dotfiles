#!/bin/bash


#set a nice backgroundm'gv``.
xsetroot -solid "#636f7d"

#fonts
xset +fp ~/.fonts
xset +fp /usr/share/fonts/bitmap/
xset fp rehash

#merge Xresources
xrdb -load ~/.Xresources

#xrandr --setprovideroutputsource modesetting NVIDIA-0
#xrandr --auto

#PA

start-pulseaudio-x11 &
dunst &
admiral.sh &
#~/.screenlayout/layout.sh & 
~/.fehbg & 
#wm
exec 2bwm

 

