import { reg, memAddressInput, stackAddressInput, viewMemory, viewStack } from './index';
import { getRandomInt } from './utils';
import { Nullable, Data } from './types';

const numbersRegEx = /[^0-9]+/g;
const hexRegEx = /[^0-9a-fA-F]+/g;

let memAddress = '0000';
let stackAddress = '0000';

let memory: Data = {
    '0000': '00'
};

let stack: Data = {
    '0000': '00'
};

const setStack = (address: string, value: any) => {
    let hexValue = '';
    address = address.substring(address.length - 4).toLowerCase();

    if (value[value.length - 1] != "h" && value[value.length - 1] != "H") {
        if (numbersRegEx.test(value))
            return "Argument is incorrect value";

        value = parseInt(value);
        hexValue = value.toString(16);
    } else {
        hexValue = value.slice(0, -1);

        if (hexRegEx.test(hexValue))
            return "Argument is incorrect value";
    }

    hexValue = hexValue.toUpperCase();

    if (hexValue.length <= 2) {
        hexValue = hexValue.padStart(2, '0');
        stack[address] = hexValue;
    } else if (hexValue.length > 2) {
        hexValue = hexValue.padStart(4, '0');
        if (hexValue.length > 4)
            hexValue = hexValue.substring(hexValue.length - 4);

        stack[(parseInt(address, 16) + 1).toString(16).padStart(4, '0')] = hexValue.slice(0, 2);
        stack[address] = hexValue.substring(2, 4);
    }

    return false;
};

const getStack = (address: string) => {
    address = address.toLowerCase();
    if (stack[address] == undefined)
        stack[address] = "00";

    return stack[address];
};

const calcMemoryAddress = (param: any) => {
    param = param.slice(1, -1);
    let regs = param.split("+");

    let sum = 0;

    for (let r of regs) {
        if (r == "bx" || r == "bp" || r == "si" || r == "di" || r == "disp") {
            sum += parseInt(reg[r].value, 16);
        } else {
            if (r[r.length - 1] != "h" && r[r.length - 1] != "H") {
                if (numbersRegEx.test(r))
                    return r + " can't be used to adress memory";

                sum += parseInt(r);
            } else {
                r = r.slice(0, -1);
                if (hexRegEx.test(r))
                    return r + " can't be used to adress memory";

                sum += parseInt(r, 16);
            }
        }
    }

    return sum.toString(16).padStart(4, '0');
}

const setMemory = (address: string, value: any) => {
    let hexValue: string;

    address = address.substring(address.length - 4).toLowerCase();

    if (value[value.length - 1] != "h" && value[value.length - 1] != "H") {
        if (numbersRegEx.test(value))
            return 'Argument is incorrect value';

        value = parseInt(value);
        hexValue = value.toString(16);
    } else {
        hexValue = value.slice(0, -1);

        if (hexRegEx.test(hexValue))
            return 'Argument is incorrect value';
    }

    hexValue = hexValue.toUpperCase();

    if (hexValue.length <= 2) {
        hexValue = hexValue.padStart(2, '0');
        memory[address] = hexValue;
    } else if (hexValue.length > 2) {
        hexValue = hexValue.padStart(4, '0');
        if (hexValue.length > 4)
            hexValue = hexValue.substring(hexValue.length - 4);

        memory[(parseInt(address, 16) + 1).toString(16).padStart(4, '0')] = hexValue.slice(0, 2);
        memory[address] = hexValue.substring(2, 4);
    }

    memAddress = address;
    memAddressInput.value = address.toUpperCase();
    viewMemory(address, memory);
    return false;
};

const getMemory = (address: string) => {
    address = address.toLowerCase();
    if (memory[address] == undefined)
        memory[address] = "00";

    return memory[address];
};

const getRegisterSize = (register: string): Nullable<Number> => {
    if (reg[register] == undefined)
        return null;

    if (register[1] == 'x' || register[1] == 'p' || register[1] == 'i')
        return 4;
    else
        return 2;
};

const setRegister = (register: string, value: any): Nullable<String> => {
    let hexValue = '';

    let registerSize = getRegisterSize(register);

    if (registerSize === null)
        return null;

    if (value[value.length - 1] != 'h' && value[value.length - 1] != 'H') {
        if (numbersRegEx.test(value))
            return 'Incorrect value';

        value = parseInt(value);
        hexValue = value.toString(16);
    } else {
        hexValue = value.slice(0, -1);

        if (hexRegEx.test(hexValue))
            return 'Incorrect value';
    }

    hexValue = hexValue.padStart(registerSize as number, '0');
    hexValue = hexValue.toUpperCase();

    if ((registerSize == 4 && hexValue.length > 4) || (registerSize == 2 && hexValue.length > 2))
        return 'Out of register bounds or incorrect argument';

    if (registerSize == 2)
        reg[register].value = hexValue;

    if (registerSize == 4) {
        if (register[1] == 'x') {
            reg[register[0].concat('h')].value = hexValue.slice(0, 2);
            reg[register[0].concat('l')].value = hexValue.substring(2, 4);
        } else {
            reg[register].value = hexValue;
        }
    }

    return null;
};

const getRegisterValue = (register: string): Nullable<String> => {
    if (reg[register] == undefined)
        return null;

    if (register[1] == 'x') {
        let valueH = reg[register[0].concat('h')].value;
        let valueL = reg[register[0].concat('l')].value;
        valueH = valueH.padStart(2, '0');
        valueL = valueL.padStart(2, '0');
        return valueH.concat(valueL).concat('h');
    } else {
        if (getRegisterSize(register) == 2)
            return reg[register].value.padStart(2, '0').concat('h');
        else if (getRegisterSize(register) == 4)
            return reg[register].value.padStart(4, '0').concat('h');
    }

    return null;
};

export const randomReg = () => {
    for (let r in reg)
        if (r != 'sp' && r[1] != 'h' && r[1] != 'l') {
            const rand = getRandomInt(0, 65535);
            setRegister(r, rand);
        }
};

export const resetReg = () => {
    for (let r in reg)
        if (r != 'sp' && r[1] != 'h' && r[1] != 'l')
            setRegister(r, 0);
};

export const resetData = () => {
    for (let entry in memory)
        memory[entry] = "00";

    memAddress = "0000";
    viewMemory(memAddress, memory);
};

export const resetStack = () => {
    for (let entry in stack)
        stack[entry] = "00";

    setRegister("sp", 0);

    stackAddress = "0000";
    viewStack(stackAddress, stack);
};


const push = (arg: string) => {
    let argSize = getRegisterSize(arg);
    
};