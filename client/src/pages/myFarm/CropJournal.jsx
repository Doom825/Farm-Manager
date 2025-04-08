import { useState } from "react";

export default function Journal() {
    // It sets up the form
    const [cropType, setCropType] = useState('');
    const [seedSupplier, setSeedSupplier] = useState('');
    const [plantDate, setPlantDate] = useState('');
    const [germinationDate, setGerminationDate] = useState('');
    const [maturityDate, setMaturityDate] = useState('');
    const [growth, setGrowth] = useState('');

    const handleInputChange = (e) => {
    // It gets the value from the inputs
    const { name, value } = e.target;

    // Create a switch that allows to take more states (set useState) based on the field name
    // TODO: Complete the rest of the inputs! We need more cases.
    switch(name) {
        case 'cropType':
            setCropType(value);
            break;
        case 'seedSupplier':
            setSeedSupplier(value);
            break;
        default:
            break;
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        alert(`Thanks for taking good care of your ${cropType}!`);
        setCropType('');
    };

    return (
        <div>
            <h2>Please tell me more about your {cropType}:</h2>
            <form className="form" onSubmit={handleFormSubmit}>
                <h3>Crop Type:</h3>
                <input
                    value={cropType}
                    name="cropType"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Crop Type"
                />
                <h3>Seed Supplier:</h3>
                <input
                    value={seedSupplier}
                    name="seedSupplier"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Seed Supplier"
                />
                <h3>Plantation Date:</h3>
                <input
                    value={plantDate}
                    name="plantDate"
                    onChange={handleInputChange}
                    type="date"
                    placeholder="04/08/2025"
                />
                <h3>Germination Date:</h3>
                <input
                    value={germinationDate}
                    name="germinationDate"
                    onChange={handleInputChange}
                    type="date"
                    placeholder="04/08/2025"
                />
                <h3>Maturity Date:</h3>
                <input
                    value={maturityDate}
                    name="maturityDate"
                    onChange={handleInputChange}
                    type="date"
                    placeholder="04/08/2025"
                />
                <h3>Growth Observations:</h3>
                <input
                    value={growth}
                    name="growth"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Please write your observations here"
                />
                <br/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};