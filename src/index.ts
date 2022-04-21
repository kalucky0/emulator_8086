import { $, $$ } from './utils';
import { randomReg, resetReg } from './emulator'

type Registers = {
  [key: string]: HTMLInputElement
}

const memAddressInput = $('#memAddress');
const stackAddressInput = $('#stackAddress');

const memInputs = $$('#memory .input');
const stackInputs = $$('#stack .input');

const memNames = $$('.mem-name');
const stackNames = $$('.stack-name');

const inputCmd = $('#cmd');

const execBtn = $('#execBtn');
const randomBtn = $('#randomBtn');
const resetRegBtn = $('#resetRegBtn');
const resetDataBtn = $('#resetDataBtn');
const resetStackBtn = $('#resetStackBtn');

const allInputs = $$('.reg-val input');
export const reg: Registers = {
    ah: $('#ah') as HTMLInputElement,
    al: $('#al') as HTMLInputElement,
    bh: $('#bh') as HTMLInputElement,
    bl: $('#bl') as HTMLInputElement,
    ch: $('#ch') as HTMLInputElement,
    cl: $('#cl') as HTMLInputElement,
    dh: $('#dh') as HTMLInputElement,
    dl: $('#dl') as HTMLInputElement,

    ax: $('#al') as HTMLInputElement,
    bx: $('#bl') as HTMLInputElement,
    cx: $('#cl') as HTMLInputElement,
    dx: $('#dl') as HTMLInputElement,

    bp: $('#bp') as HTMLInputElement,
    si: $('#si') as HTMLInputElement,
    di: $('#di') as HTMLInputElement,
    sp: $('#sp') as HTMLInputElement,

    disp: $('#disp') as HTMLInputElement,
}

randomBtn.onclick = () => randomReg();
resetRegBtn.onclick = () => resetReg();