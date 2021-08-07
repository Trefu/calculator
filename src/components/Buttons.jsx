import { useState } from 'react';

export const Buttons = (props) => {
    const { input, setInput } = props;
    const [hasDecimal, setHasDecimal] = useState(false)

    const handleClick = (e) => {

        const value = e.target.value;
        const lastInput = input[input.length - 1];
        const firstNumberIsZero = input[0] === '0' && input.length <= 1 ? true : false;

        if (isNaN(value)) {
            //Reseta el input
            if (value === 'restart') {
                setHasDecimal(false)
                return setInput(['0']);
            }
            //Resultado
            if (value === '=') {
                try {
                    const filtered = input.join('').match(/(\*|\+|\/|-)?(\.|-)?\d+/g).join('');
                    // eslint-disable-next-line
                    const result = eval(filtered);
                    return setInput([result])
                } catch (error) {
                    console.log(error)
                    return setInput(['ERROR'])
                }
            }
            //En caso de ser el primer input reemplaza el cero por el valor obtenido
            if (firstNumberIsZero) return setInput([...input, value]);

            if (value === '-' && isNaN(lastInput)) {

                return setInput([...input, value])
            }

            //No permite el doble punto o el punto seguido de un simbolo aritmetico
            if (value === '.' && isNaN(lastInput)) return console.log("no puede haber punto seguido de simbolo o punto");

            //evita simbolos aritmeticos post puntos
            if (lastInput === '.') return

            //Si el numero ya contiene decimal retorna
            if (value === '.' && hasDecimal) return console.log("ya tenia punto este numero");

            //Agrega decimal si el ultimo input fue un numero
            if (value === '.' && !isNaN(lastInput)) {
                setHasDecimal(true)
                return setInput([...input, value])
            }

            //Reemplaza ultimo operador aritmeticp
            /*            if (isNaN(lastInput) && lastInput !== '.') {
                           const auxInput = [...input];
                           auxInput.pop()
                           return setInput([...auxInput, value])
                       } */

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