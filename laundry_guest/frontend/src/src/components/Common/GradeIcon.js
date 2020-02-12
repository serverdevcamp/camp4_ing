import React from 'react';
import StarIcon from '@material-ui/icons/Star';

// TODO: 별 절반인 부분에 대해서 처리해주기
const GradeIcon = ({ grade, fontSize }) => {

  const gradeInt = parseInt(grade);
  const stars = [];
  for (let i = 0; i < gradeInt; i++) {
    stars.push(<StarIcon style={{ fontSize: `${fontSize}px` }} />);
  }
  return stars;
}

export default GradeIcon;