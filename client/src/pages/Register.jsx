import { Link } from 'react-router-dom';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type={'text'} name={'name'} defaultValue={'Yazan'} />
        <FormRow
          type={'text'}
          name={'lastName'}
          labelText={'last name'}
          defaultValue={'Alshoubaki'}
        />
        <FormRow type={'text'} name={'location'} defaultValue={'earth'} />
        <FormRow
          type={'email'}
          name={'email'}
          defaultValue={'yazan@gmail.com'}
        />
        <FormRow type={'password'} name={'password'} defaultValue={'123456'} />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
