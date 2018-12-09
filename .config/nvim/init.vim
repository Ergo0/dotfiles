filetype plugin on

function! BuildComposer(info)
  if a:info.status != 'unchanged' || a:info.force
    if has('nvim')
      !cargo build --release
    else
      !cargo build --release --no-default-features --features json-rpc
    endif
  endif
endfunction



set shell=bash\ -i

call plug#begin('~/.local/share/nvim/plugged')

Plug 'junegunn/vim-easy-align'

Plug 'suan/vim-instant-markdown'

Plug 'chrisbra/Colorizer'

Plug 'euclio/vim-markdown-composer', { 'do': function('BuildComposer') }
call plug#end()
