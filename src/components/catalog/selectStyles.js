const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#212121',
        borderColor: state.isFocused ? '#BE15F4' : '#333',
        boxShadow: state.isFocused ? `0 0 5px 1px #BE15F4` : 'none',
        '&:hover': {
            borderColor: '#BE15F4',
        },
        color: '#ffffff',
        borderRadius: '10px',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#BE15F4' : '#2C3E50',
        color: '#fff',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#BE15F4',
            color: '#000',
            cursor: "pointer"
        }
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#444',
        borderRadius: '5px',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: 'white',
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: '#BE15F4',
        '&:hover': {
            backgroundColor: '#BE15F4',
            color: 'white',
        }
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#212121',
        borderRadius: '7px',
        border: '1px solid #333',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
    }),
    menuList: (base) => ({
        ...base,
        "::-webkit-scrollbar": {
            width: "8px"
        },
        "::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1"
        },
        "::-webkit-scrollbar-thumb": {
            backgroundColor: "#BE15F4"
        }
    }),
};

export default customStyles;
