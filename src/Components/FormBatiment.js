const FormBatiment = (props) => {
    const myBat = props.batiment;

    return (
        <>
            {/*<p>{myBat.name}</p>*/}
            <p>{myBat.name}</p>

            <label htmlFor="nomBat">Nom</label>
            <input type="text" name="nomBat" id="nomBat"/>
            <br/>

            <label htmlFor="addressBat">Adresse</label>
            <input type="text" name="addressBat" id="addressBat"/>
            <br/>

            <label htmlFor="latitudeBat">Latitude</label>
            <input type="text" name="latitudeBat" id="latitudeBat"/>
            <br/>

            <label htmlFor="longitudeBat">Longitude</label>
            <input type="text" name="longitudeBat" id="longitudeBat"/>
            <br/>
            <button type="submit" id="submitForm">Mettre à jour</button>


        </>
    )

}

export default FormBatiment;