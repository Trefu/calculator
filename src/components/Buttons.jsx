import { useState } from 'react';
import { restart } from '../utils'

export const Buttons = (props) => {
    const { input, setInput } = props;
    const [hasDecimal, setHasDecimal] = useState(false)
    const actions = [restart]

    const handleClick = (e) => {
        console.log(hasDecimal)
        const value = e.target.value;
        const lastInput = input[input.length - 1];
        const firstNumberIsZero = input[0] === '0' && input.length <= 1 ? true : false;

        if (isNaN(value)) {
            //RESETEO
            if (value === 'restart') return setInput(['0']);

            //NO DOBLE PUNTO
            if (value === '.' && lastInput === '.') return console.log("YA TENIA PUNTITO XD");

            //Si el primero numero es cero le agrega el operador
            if (firstNumberIsZero) return setInput([...input, value]);

            if (value === '.' && hasDecimal) return console.log("ya tenia punto este numero")

            //Agrega decimal 
            if (value === '.' && !isNaN(lastInput)) {
                setHasDecimal(true)
                console.log("cambio a", hasDecimal)
                return setInput([...input, value])
            }

            //Reemplaza el ultimo simbolo aritmetico
            if (isNaN(lastInput)) {
                const auxInput = [...input];
                auxInput.pop();
                return setInput([...auxInput, value])
            }
            setHasDecimal(false)
            return setInput([...input, value])


        }

        if (firstNumberIsZero) return setInput([value])
        return setInput([...input, value])
    }
    return (
        <div className="grid grid-cols-4 gap-px text-center text-blue-200 bg-blue-300 ">

            <button id='clear' onClick={handleClick} value='restart' className='bg-blue-700 py-4 col-span-2 mr-px'>AC</button>
            <button id='divide' value={'/'} onClick={handleClick} className='bg-blue-500 py-4 '>/</button>
            <button id='multiply' value={'*'} onClick={handleClick} className='bg-blue-500 py-4 ' >X</button>
            <button id='seven' value={7} onClick={handleClick} className='bg-blue-500 py-4'>7</button>
            <button id='eight' value={8} onClick={handleClick} className='bg-blue-500 py-4 '>8</button>
            <button id='nine' value={9} onClick={handleClick} className='bg-blue-500 py-4 ' >9</button>
            <button id='subtract' value={'-'} onClick={handleClick} className='bg-blue-500 py-4'>-</button>
            <button id='four' value={4} onClick={handleClick} className='bg-blue-500 py-4 '>4</button>
            <button id='five' value={5} onClick={handleClick} className='bg-blue-500 py-4 ' >5</button>
            <button id='six' value={6} onClick={handleClick} className='bg-blue-500 py-4'>6</button>
            <button id='add' value={'+'} onClick={handleClick} className='bg-blue-500 py-4 '>+</button>
            <button id='one' value={1} onClick={handleClick} className='bg-blue-500 py-4 ' >1</button>
            <button id='two' value={2} onClick={handleClick} className='bg-blue-500 py-4 ' >2</button>
            <button id='three' value={3} onClick={handleClick} className='bg-blue-500 py-4 ' >3</button>
            <button id='equals' value={'='} onClick={handleClick} className='bg-blue-700 py-4 row-span-2 flex flex-col justify-center items-center' >=</button>
            <button id='zero' value={0} onClick={handleClick} className='bg-blue-500 py-4 col-span-2 mr-px' >0</button>
            <button id='decimal' value={'.'} onClick={handleClick} className='bg-blue-500 py-4 ' >.</button>

        </div>
    )
}

export default Buttons