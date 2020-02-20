import React,{useState,useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from 'react-modal';
import className from 'classnames';
import DaumPostcode from 'react-daum-postcode';
import styles from './ReviewRegisterInputForm.scss';
import CustomInput from '../Common/Input';
import CustomButton from '../Common/CustomButton';
import {Link} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';





const cx = className.bind(styles);

   const styledRating = withStyles({

   })(Rating);

const ReviewRegisterInputForm = ({shopname, day, star, content, image}) => {


  const [isOpenedModal,setOpenedModal] = useState(false);
  const [address,setAddress] = useState('');


  useEffect(()=>{

  },[]);


  const onToggleModal = () => {
    this.setState({
      isOpenedModal: !this.state.isOpenedModal
     });
   };

  const onClickAddress = (objAddress) => {
    this.setState({
      address: objAddress.address
    });
    onToggleModal();
    this.detailedAddress.current.focus();
  };

   const [value, setValue] = React.useState(star);
   const [imgBase64, setImgBase64] = useState(""); // 파일 base64
   const [imgFile, setImgFile] = useState(null);	//파일


    const handleChangeFile = (event) => {
    let reader = new FileReader();
    console.log(reader)

    reader.onloadend = () => {

      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  }

  const handleRemove = () => {
    setImgBase64("");
    setImgFile(null);
  };



    return (
      <div className={cx('reviewregisterInputContent')}>
        <form className={cx('reviewregisterinfo')}>
         <div className={cx('formwrapper')}>
          <span className={cx('reviewregister-rowItem')}>
            <span className={cx('label')}>{shopname}</span>
          </span>
          <span className={cx('reviewregister-rowItem')}>
            <span className={cx('label')}>주문일자</span>
            <span className={cx('label')}>{day}</span>
          </span>
          <span className={cx('reviewregister-rowItem')}>
            <span className={cx('label')}>별점</span>
           <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating

                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    style={{color:"#cccccc !important"}}
                />
            </Box>
          </div>
          </span>
          <span className={cx('reviewregister-rowItem')}>
            <span className={cx('review-image')}>
                 <div style={{"backgroundColor": "#efefef", "width":"100px", "height" : "100px"}}>
                 {imgBase64 ? (
                <img src={imgBase64} onClick={handleRemove}></img>
                    ) : (
                    <div></div>
                    )}
                    </div>
                <div><input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile}/></div>
            </span>
          </span>


                <textarea className={cx('inputText')}
                type={'text'}
                required={true}
                placeholder={'내용을 입력하세요'}>
                {content}
                </textarea>


            </div>

          <CustomButton
            className={cx('RegisterButton')}
            type={'button'}
            onClick={onToggleModal}
            value={'완료'}
          />
        </form>
      </div>
    );

}

Modal.setAppElement('#root');

export default ReviewRegisterInputForm;