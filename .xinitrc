#set a nice backgroundm'gv``.
xsetroot -solid "#636f7d"

#fonts
xset +fp /home/nathaniel/.fonts
xset fp rehash

#merge Xresources
xrdb -load ~/.Xresources

#xrandr --setprovideroutputsource modesetting NVIDIA-0
#xrandr --auto

#PA
#compton &
start-pulseaudio-x11 &
~/.screenlayout/layout.sh & 
~/.fehbg & 
#wm
exec 2bwm
 

