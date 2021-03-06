import React from "react";
import {Card, CardContent, GridListTile} from "@material-ui/core";
import style from './RegisterdItemView.scss';
import className from 'classnames';
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {MODE} from "../../pages/ProductRegistrationView";

const customStyle = makeStyles({
  card: {
    width: '300px',
    height: '255px',
    marginLeft: '15px',
    marginTop: '15px'
  },

  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  cardButton: {
    cursor: 'pointer',
    color: '#999999'
  }
});

const cx = className.bind(style);

const RegisteredItemView = ({
                              id, name, material, price, information,
                              openRegistrationForm, deleteItem
                            }) => {
  const customClasses = customStyle();

  return (
    <GridListTile style={{height: '275px'}}>
      <Card variant={"outlined"} className={customClasses.card}>
        <CardContent className={customClasses.cardContent}>
          <div className={cx('registeredItemView-img')}/>
          <Typography>{name}</Typography>
          <div className={cx('registeredItemView-data')}>
            <Typography>소재명 : {material} </Typography>
            <Typography>가격 : {price} 원</Typography>
          </div>
          <div className={cx('registeredItemView-dataModify')}>
            <Typography
              variant={"button"}
              className={customClasses.cardButton}
              onClick={() => openRegistrationForm(MODE.MODIFY, id,name, material, price, information)}>
              수정하기
            </Typography>
            <Typography
              variant={"button"}
              className={customClasses.cardButton}
              onClick={() => deleteItem(id)}>
              삭제하기
            </Typography>
          </div>
        </CardContent>
      </Card>
    </GridListTile>
  )
};

export default RegisteredItemView;