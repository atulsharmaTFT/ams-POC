import React from 'react'
import classes from "./table.module.scss"
import { Capitalize } from '../../helper/commonHelpers';
const CustomTable = ({data,loading,coloumnHeaders}) => {
    console.log(data,loading,coloumnHeaders,"POP");
    return(
<div className={classes.container}>
{/* <Loader showOnFullScreen={false} loading={validateQuizLoading} /> */}
<div className={classes.filterContainer}>
  <h2>Scheduled Quiz</h2>
  {/* <Select
    value={selectedFilter.value}
    onChange={handleChangeFilter}
    placeholder="filter"
    selectClassName={classes.filterSelect}
    options={filterSelectOptionData}
  /> */}
</div>
<div className={classes.tableView}>
  <div className={classes.categoryTableHeader}>
    {coloumnHeaders?.map((item)=><div>{item}</div>)}
  </div>
  {loading ? (
    // <Loader
    //   showOnFullScreen={false}
    //   loading={filterScheduledQuizLoading}
    // />
    <p>loading</p>
  ) : data?.length > 0 ? (
    data?.map((data) => {
      return (
        <div className={classes.categoryTableContentRow} key={data._id}>
          <div>{Capitalize(data.quizId?.quizName || "")}</div>
          <div>{Capitalize(data.organization || "")}</div>
          <div>{data.noOfPlayers}</div>
          <div>{data.roomId}</div>
          <div>{Capitalize(data.quizStatus || "")}</div>
          <div>
            {/* {moment(data?.scheduledDate).format("DD-MMMM-YYYY hh:mm a")} */}{""}
          </div>
          <div>
            {/* <div className={classes.startButtonContainer}>
              <button
                disabled={data.quizStatus === "completed"}
                className={classes.startButton}
                onClick={() => validateQuiz({ roomId: data?.roomId })}
              >
                Start
              </button>
            </div> */}
            <div className={classes.otherButtonContainer}>
              <div
                className={classes.otherButton}
                onClick={() => console.log(data)}
              >
                {/* <img src={editBtn} /> */}
              </div>
              <div
                className={classes.otherButton}
                onClick={() => console.log(data?.roomId)}
              >
                {/* <img src={deleteBtn} /> */}
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className={classes.noDataFoundContainer}>
      {/* <NoDataFound
        string={`No ${
          selectedFilter.value === "all" ? "" : selectedFilter.text
        } Scheduled Quiz Found`}
      /> */}
    </div>
  )}
</div>
{/* <Pagination
  totalPages={filterScheduledQuizResponse?.data?.maxPage}
  currentPage={page.current}
  onPageChange={handlePageChange}
/> */}
</div>
    )
}

export default CustomTable