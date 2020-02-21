import React, {useState} from "react";
import {Box, Modal, Paper, Typography, withStyles, Menu} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';
import {Button} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const modalStyle = makeStyles({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    justifyContent: 'center'

  },
  rowItem: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitIcon: {
    marginLeft: 'auto',
    cursor: 'pointer'
  },
  content: {
    flex: '10',
    paddingLeft: '10px',
    paddingTop: '10px',
    paddingRight: '10px',
    borderTop: '1px solid #cccccc',
    borderBottom: '1px solid #cccccc'
  },
  chatInputDiv: {
    flex: '1',
    background: 'white',
    display: 'flex',
    padding: '5px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatInput: {
    flex: '1',
    height: '100%',
    border: 'none',
    fontSize: '16px',
    outline: 'none'
  }

});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const DetailOrderModal = ({
                            isModalOpen, orderId, status, price, pickUpAddress, deliveryAddress, createAt, orderItems,
                            setModalOpen, modifyOrderStatus
                          }) => {

  let index = 0;
  const style = modalStyle();

  const [menuAnchor, setMenuAnchor] = useState(null);

  const clickMenu = (e) => {
    setMenuAnchor(e.target);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <Modal
      open={isModalOpen}>
      <Paper
        className={style.paper}
        style={{width: '500px', height: '600px'}}>
        <Box
          className={style.header}>
          <Typography
            variant={"h5"}>
            주문상세정보
          </Typography>
          <ClearIcon
            style={{cursor: 'pointer', marginLeft: 'auto'}}
            onClick={() => setModalOpen(false)}
          />
        </Box>
        <Box
          className={style.content}
        >
          <Box
            className={`${style.rowItem} ${style.spaceBetween}`}
          >
            <Typography
              variant={"h6"}
            >
              주문 상태
            </Typography>
            <Typography>
              {status}
              <Button
                style={{
                  marginLeft: '10px',
                  backgroundColor: "#ffffff",
                  border: '1px solid #35AD3A',
                }}
                size={"small"}
                onClick={(e) => clickMenu(e)}
              >
                변경하기
              </Button>
              <StyledMenu
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
              >
                <MenuItem
                  onClick={() => {
                    modifyOrderStatus(orderId,'ready');
                    closeMenu();
                  }}
                >
                  미결제
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    modifyOrderStatus(orderId,'paid');
                    closeMenu();
                  }}
                >
                  결제완료
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    modifyOrderStatus(orderId,'cancelled');
                    closeMenu();
                  }}
                >
                  결제취소
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    modifyOrderStatus(orderId,'failed');
                    closeMenu();
                  }}
                >
                  결제실패
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    modifyOrderStatus(orderId,'waiting');
                    closeMenu();
                  }}
                >
                  세탁대기
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    modifyOrderStatus(orderId,'process');
                    closeMenu();
                  }}
                >
                  세탁처리
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    modifyOrderStatus(orderId,'finished');
                    closeMenu();
                  }}
                >
                  세탁완료
                </MenuItem>
              </StyledMenu>


            </Typography>
          </Box>
          <Box
            className={`${style.rowItem} ${style.spaceBetween}`}
          >
            <Typography
              variant={"h6"}
            >
              주문 가격
            </Typography>
            <Typography>
              {price} 원
            </Typography>
          </Box>

          <Box
            className={style.rowItem}
          >
            <Typography
              variant={"h6"}
            >
              배달 주소
            </Typography>
            <Typography
              variant={"body2"}
            >
              {deliveryAddress}
            </Typography>
          </Box>

          <Box
            className={style.rowItem}
          >
            <Typography
              variant={"h6"}
            >
              수거 주소
            </Typography>
            <Typography
              variant={"body2"}
            >
              {pickUpAddress}
            </Typography>
          </Box>

          <Box
            className={style.rowItem}
          >
            <Typography
              variant={"h6"}
            >
              주문 생성일
            </Typography>
            <Typography
              variant={"body2"}
            >
              {createAt.toString()}
            </Typography>
          </Box>

          <Box
            className={style.rowItem}
          >
            <Typography
              variant={"h6"}
            >
              상품 정보
            </Typography>
            {orderItems.map(item => (
              <Typography key={index++}>
                상품명 : {item.laundry_item.category} 소재 : {item.laundry_item.material} 수량 : {item.quantity} 개
              </Typography>
            ))}

          </Box>

        </Box>
      </Paper>
    </Modal>
  )
};

export default DetailOrderModal;