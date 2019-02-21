import React, {useState}  from 'react';
import {  updateAddress, updateCity, updateState, updateZip, updateProfilePic } from '../../ducks/reducer';
import  "./register.css";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import {storage} from '../../firebase'
=======
import swal from 'sweetalert'
>>>>>>> master



const Register2 = (props) => {
    const [toggle, setToggle] = useState(false);
    const handleUpdate = (e) =>{
        console.log('these are the props right here',props)
        switch (e.target.name) {
            case 'address':
                props.updateAddress(e.target.value);
                console.log('address')
                break
            case 'city':
                props.updateCity(e.target.value);
                console.log('city')
                break
            case 'state':
                props.updateState(e.target.value);
                console.log('state')
                break
            case 'zip':
                props.updateZip(e.target.value);
                console.log('zip')
                break
            case 'file':
                console.log(e.target.files[0])
                props.updateProfilePic(e.target.files[0]);
                console.log('prof')
                break
            default:
                break;
        }
    }



    const submitRegister = () => {
        const { firstName, lastName, username, password, address, city, st, zip, profilePic } = props;
        console.log('destructured')
            axios.post("/api/auth/register",{firstName, lastName, username, password, address, city, state: st, zip})
                .then( response => {
                    console.log(response)
                    const upload = storage.ref(`profile-pictures/${username}`).put(profilePic);
                    upload.on('state_changed', () => null, (err) => console.log(err), () => {
                        storage.ref(`profile-pictures/${username}`).getDownloadURL().then(downloadURL => {
                            axios.post('/auth/set/profile', {userID: response.data.userId, downloadURL}).then(() => {
                               setToggle(true) 
                            })
                        })
                    })
                }).catch( err => console.log(err))

                swal({
                    title: 'Register',
                    text: 'Registration successful',
                    icon: 'success',
                })
    }

                    // setToggle(true);
   



    return (
        <div className="register-page-2">
            {toggle && <Redirect to='/home' />}
            <Link to="/auth/register-1"><i className="fas fa-chevron-left"></i> </Link>

            <img 
                src="https://s3.us-east-2.amazonaws.com/first-night-out/FNO-main-logo.png" 
                alt="first-night-out-logo" 
                className="reg-logo"
            />


            <input name='address' onChange={handleUpdate} placeholder='Address' className='reg-input'/>
            <input name='city' onChange={handleUpdate} placeholder='City' className='reg-input'/>
            <input name='state' onChange={handleUpdate} placeholder='State' className='reg-input'/>
            <input name='zip' onChange={handleUpdate} placeholder='Zip' className='reg-input'/>

            <input 
                type="file" 
                name="file" 
                id="file" 
                className="inputfile" 
                onChange={handleUpdate}
            />
            <label for="file"><i className="fas fa-camera"></i></label> 
            
            <button onClick={submitRegister} className='reg-button'><Link to='/home'>Sign up</Link></button>
        </div>
    )
}


const mapStateToProps = state => state;
export default connect(mapStateToProps, { updateAddress, updateCity, updateState, updateZip, updateProfilePic })(Register2);
