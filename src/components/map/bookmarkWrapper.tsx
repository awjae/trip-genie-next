import { SpotType } from '@/types/spot'
import React from 'react'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import styles from '@/styles/bookmark.module.css'
import mapStyles from '@/styles/map.module.css'
import styled from '@emotion/styled';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginBottom: '10px',
  '&:before': {
    display: 'none',
  },
  '& > div:first-of-type:hover': {
    borderRadius: '5px 5px 0px 0px',
    backgroundColor: 'rgb(4, 116, 244, .1)'
  },
  '& .MuiCollapse-vertical': {
    borderRadius: '0px 0px 5px 5px',
    borderLeft: 'solid 1px #f2f8fe',
    borderRight: 'solid 1px #f2f8fe',
    borderBottom: 'solid 1px #f2f8fe',
    boxSizing: 'border-box'
  },
  '& .MuiAccordionDetails-root': {
    padding: '8px',
  }
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#f2f8fe',
  flexDirection: 'row-reverse',
}))

interface BookmarkWrapperType { 
  bookmarkList: SpotType[]; 
  hotelList: SpotType[]; 
  handleSpotClick: Function; 
  handleDeleteBookmark: Function; 
}
function BookmarkWrapper({ bookmarkList, hotelList, handleSpotClick, handleDeleteBookmark }: BookmarkWrapperType) {

  const handleClickDeleteBtn = (e: React.MouseEvent<HTMLButtonElement>, item: SpotType, type: string) => {
    e.stopPropagation()
    if (type === "bookmark") {
      handleDeleteBookmark(item)
      return
    }
    if (type === "hotel") {

      return
    }
  }

  return (
    <div className={styles.bookmarkWrapper}>
      <Accordion expanded>
        <AccordionSummary>
          <Typography className={styles.typography}>
            <Image alt='숙소 아이콘' src='/images/icon/home.png' width={18} height={18}></Image>
            숙소
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles.typographyDetails}>
            <ul>
              {hotelList.length === 0 && (
                <li>저장한 장소가 없습니다.</li>
              )}
              {hotelList.map(el => (
                <li key={el.id} className={styles.bookmarkItem} onClick={() => handleSpotClick(el, 'hotel')}>
                  <span>{el.name}</span>
                  <button className={mapStyles.spotAddBtn} onClick={(e) => handleClickDeleteBtn(e, el, 'hotel')}>
                    <Image alt='북마크 제거 아이콘' src='/images/icon/minus.png' width={18} height={18}></Image>
                  </button>
                </li>  
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded>
        <AccordionSummary>
          <Typography className={styles.typography}>
            <Image alt='장소 아이콘' src='/images/icon/bookmark.png' width={18} height={18}></Image>
            장소
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles.typographyDetails}>
            <ul>
              {bookmarkList.length === 0 && (
                <li>저장한 장소가 없습니다.</li>
              )}
              {bookmarkList.map(el => (
                <li key={el.id} className={styles.bookmarkItem} onClick={() => handleSpotClick(el, 'bookmark')}>
                  <span>{el.name}</span>
                  <button className={mapStyles.spotAddBtn} onClick={(e) => handleClickDeleteBtn(e, el, 'bookmark')}>
                    <Image alt='북마크 제거 아이콘' src='/images/icon/minus.png' width={18} height={18}></Image>
                  </button>
                </li>  
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default BookmarkWrapper