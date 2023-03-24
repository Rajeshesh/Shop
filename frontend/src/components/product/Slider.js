import Slider from '@mui/material/Slider';

export default function RangeSlider({ price: value, setPrice: setValue }) {
    function valuetext(value) {
        return `${value}`;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Slider
        size='small'
            min={10}
            step={30}
            max={1000}
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            marks = {[
                {
                  value: 10,
                  label: '10$',
                },
                {
                  value: 1000,
                  label: '1000$',
                },
              ]}
        />
    );
}