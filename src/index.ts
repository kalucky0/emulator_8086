import { $, $$ } from './utils';
import { executeCommand, randomReg, resetData, resetReg, resetStack } from './emulator'
import { Data, Registers } from './types';

export const memAddressInput = $('#memAddress') as HTMLInputElement;
export const stackAddressInput = $('#stackAddress') as HTMLInputElement;

const memInputs = $$('#memory .input');
const stackInputs = $$('#stack .input');

const memNames = $$('.mem-name');
const stackNames = $$('.stack-name');

const inputCmd = $('#cmd') as HTMLInputElement;

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
};

randomBtn.onclick = () => randomReg();
resetRegBtn.onclick = () => resetReg();
resetDataBtn.onclick = () => resetData();
resetStackBtn.onclick = () => resetStack();
execBtn.onclick = () => {
  const res = executeCommand(inputCmd.value);
  if (res) alert(res);
};


export const viewMemory = (from: string, memory: & Data) => {
  from = from.toLowerCase();

  let parts: string[] = [];
  memNames.forEach((memName, i) => {
    parts[i] = i == 0 ? from.slice(0, -1) + '0' : (parseInt(parts[i - 1], 16) + 16).toString(16).padStart(4, '0');
    memName.innerHTML = parts[i].length > 4 ? '' : parts[i];
  });

  memInputs.forEach(e => {
    let input = e as HTMLInputElement;

    let part = '';
    if (input.id[1] == 'a')
      part = parts[0];
    else if (input.id[1] == 'b')
      part = parts[1];
    else if (input.id[1] == 'c')
      part = parts[2];
    else if (input.id[1] == 'd')
      part = parts[3];

    let address = (part.slice(0, -1) + input.id[0]).toLowerCase();

    if (address.length > 4) {
      input.value = "";
      return;
    }

    if (memory[address] == undefined)
      memory[address] = "00";

    input.value = memory[address].toUpperCase();

    if (from == address)
      input.classList.add("highlight");
    else
      input.classList.remove("highlight");


    input.parentElement!.id = address;
  });
};

export const viewStack = (from: string, stack: & Data) => {
  from = from.toLowerCase();

  let parts: string[] = [];
  stackNames.forEach((stackName, i) => {
    parts[i] = i == 0 ? from.slice(0, -1) + '0' : (parseInt(parts[i - 1], 16) + 16).toString(16).padStart(4, '0');
    stackName.innerHTML = parts[i].length > 4 ? '' : parts[i];
  });

  stackInputs.forEach(e => {
    let input = e as HTMLInputElement;

    let part = '';
    if (input.id[2] == 'a')
      part = parts[0];
    else if (input.id[2] == 'b')
      part = parts[1];
    else if (input.id[2] == 'c')
      part = parts[2];
    else if (input.id[2] == 'd')
      part = parts[3];

    let address = (part.slice(0, -1) + input.id[1]).toLowerCase();

    if (address.length > 4) {
      input.value = "";
      return;
    }

    if (stack[address] == undefined)
      stack[address] = "00";

    input.value = stack[address].toUpperCase();

    input.parentElement!.id = "s" + address;

    if (reg.sp.value.toLowerCase() == address)
      input.classList.add("highlight");
    else
      input.classList.remove("highlight");
  });
};