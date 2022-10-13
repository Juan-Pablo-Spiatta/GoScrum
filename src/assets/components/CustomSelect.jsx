import React from 'react'
import Select from 'react-select'

function CustomSelect({ options, onChange, value, placeholder, def }) {
    const customStyles = {
        option: (styles, state) => ({
          ...styles,
          cursor: 'pointer',
        }),
        control: (styles) => ({
          ...styles,
          cursor: 'pointer',
        }),
    }
    const defaultValue = (options,value) => {
        return options ? options.find(options => options.value === value): ""
    }
    return (
        <>
            <Select 
                placeholder={ placeholder ? placeholder : "Selecionar" }
                defaultValue={ { label: def, value: def }}
                value={ defaultValue(options, value) }
                onChange= { value => onChange(value) }
                options={ options } 
                theme={(theme) => ({
                    ...theme,
                    borderRadius: "5px",
                    colors: {
                        ...theme.colors,
                        primary25: '#ff442b46',
                        primary: '#ff442b',
                    },
                })}
                styles={ customStyles }
            />
        </>
    )
}

export default CustomSelect