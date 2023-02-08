import LoadingButton from "../../../../components/UI/LoadingButton/LoadingButton";

const AddHotel = props => {
    return (
        <div className="card">
            <div className="card-header">Nowy hotel</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane hotelu</p>
                <form>

                    <div className="form-group">
                        <label>Nazwa</label>
                        <input 
                            type="text"
                            className={`form-control ${false ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback"> 
                            Błąd
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Miasto</label>
                        <input 
                            type="text"
                            className={`form-control ${false ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback"> 
                            Błąd
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Ilość pokoi</label>
                        <select className="form-control">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <div className="invalid-feedback"> 
                            Błąd
                        </div>
                    </div>

                    <h4>Udogodnienia</h4>
                    <div className="form-group">
                        <div class="custom-control custom-checkbox">
                            <input 
                                type="checkbox"
                                class="custom-control-input"
                                id="tv" 
                            />
                            <label class="custom-control-label" for="tv">TV</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input 
                                type="checkbox"
                                class="custom-control-input"
                                id="wifi" 
                            />
                            <label class="custom-control-label" for="wifi">WI-FI</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input 
                                type="checkbox"
                                class="custom-control-input"
                                id="parking" 
                            />
                            <label class="custom-control-label" for="parking">Parking</label>
                        </div>
                    </div>

                    <h4>Zdjęcie</h4>
                    <div className="form-group">
                        <input type="file" />
                    </div>

                    <h4>Status</h4>
                    <div className="form-group">
                        <div class="custom-control custom-radio">
                            <input 
                                type="radio"
                                id="status-active"
                                name="status"
                                class="custom-control-input"
                            />
                            <label class="custom-control-label" for="status-active">Aktywny</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input 
                                type="radio"
                                id="status-hide"
                                name="status"
                                class="custom-control-input"
                            />
                            <label class="custom-control-label" for="status-hide">Ukryty</label>
                        </div>
                    </div>

                    <div className="text-right">
                        <LoadingButton
                            loading={false}
                            className="btn-success">
                                Dodaj hotel!
                            </LoadingButton>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddHotel;