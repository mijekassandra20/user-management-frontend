import React from 'react'

const Form = () => {
    return (
        <div>
            <div className="form-container">
                <TextField id="outlined-basic" label="First Name" variant="outlined" />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" />
                <TextField id="outlined-basic" label="Address" variant="outlined" />
                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Username" variant="outlined" />
                <Autocomplete
                    id="gender-picker"
                    options={genderOptions}
                    getOptionLabel={(option) => option.label}
                    clearOnEscape
                    renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" />}
                />
                <Autocomplete
                    id="gender-picker"
                    options={userOption}
                    getOptionLabel={(option) => option.label}
                    clearOnEscape
                    renderInput={(params) => <TextField {...params} label="User Role" variant="outlined" />}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Birthday" />
                </LocalizationProvider>
            </div>
        </div>
    )
}

export default Form