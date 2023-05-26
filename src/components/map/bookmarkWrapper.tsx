import { SpotType } from '@/types/spot'
import React from 'react'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import styles from '@/styles/bookmark.module.css'
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


function BookmarkWrapper({ bookmarkList }: { bookmarkList: SpotType[] }) {
  return (
    <div className={styles.bookmarkWrapper}>
      <Accordion>
        <AccordionSummary>
          <Typography className={styles.typography}>
            <Image alt='숙소 아이콘' src='/images/icon/home.png' width={18} height={18}></Image>
            숙소
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles.typographyDetails}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
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
                <li key={el.id}>{el.name}</li>  
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default BookmarkWrapper