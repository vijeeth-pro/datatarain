import { EventContentArg } from '@fullcalendar/core/index.js'
import React from 'react'
import { Badge, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { Event as EventType } from '../types/meeting'
import { ArrowRightAlt, Close, CreateOutlined, DeleteOutlineRounded, DownloadDoneRounded, DownloadForOffline, GetApp, Password, RemoveRedEyeRounded } from '@mui/icons-material'
import Grid from '@mui/material/Grid';
import { GoogleMeet } from '../assets/svg'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'transparent',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        // border: '1px solid #dadde9',
    },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));




function Event(props: EventContentArg) {
    const { event } = props
    const { _def: data } = event

    const [eventDialog, setEventDialog] = React.useState(false)
    const [dialogData, setDialogData] = React.useState<EventType | null>(null)

    const handleClose = () => {
        setEventDialog(false)
    }

    const handleDialogOpen = (item: EventType) => {
        setEventDialog(true)
        setDialogData(item)
    }


    return (
        <>
            {/* hover tooltip */}
            <HtmlTooltip title={
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    {data?.extendedProps?.data?.map((item: EventType) => {
                        return (
                            <Box
                                component={'a'}
                                onClick={() => handleDialogOpen(item)}
                                sx={{
                                    background: 'white',
                                    // border: '1px solid black',
                                    borderRadius: '8px',
                                    padding: '5px',
                                    color: 'black',
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                    minWidth: '250px',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '5px',
                                    cursor: 'pointer'
                                }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Typography variant='body2' sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        textTransform: 'capitalize'
                                    }}>{item?.job_id?.jobRequest_Title}</Typography>
                                    {/* <Typography variant='body1' textTransform={'capitalize'}>{item?.job_id?.jobRequest_Title}</Typography> */}
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <IconButton size='small'><CreateOutlined scale={'small'} color='primary' /></IconButton>
                                        <IconButton size='small'><DeleteOutlineRounded scale={'small'} color='error' /></IconButton>
                                    </Box>
                                </Box>
                                <Typography variant='inherit' sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>{item.desc} | InterViewer: {item?.user_det?.handled_by?.firstName}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                    <Typography variant='inherit'>Date: {dayjs(item.start).format('DD MMM YYYY')}</Typography>
                                    <Typography variant='inherit'>{dayjs(item.start).format('hh:mm A')}</Typography>
                                </Box>
                            </Box>
                        )

                    })}
                </Box>
            } placement='right'>

                {/* badge count */}
                <Badge sx={{ width: '100%', minWidth: '200px' }} showZero={false} badgeContent={data.extendedProps?.data?.length === 1 ? 0 : data.extendedProps?.data?.length} color="warning">
                    <Box component={'div'} sx={{
                        background: 'white',
                        color: 'black',
                        width: '100%',
                        minWidth: '200px',
                        borderRadius: '5px',
                        overflow: 'visible',
                        // border: '1px solid black',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Box sx={{
                            width: '20px',
                            borderTopLeftRadius: '5px',
                            borderBottomLeftRadius: '5px',
                            background: 'blue'
                        }} ></Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingLeft: '10px',
                            gap: '2px',
                            padding: '6px'
                        }}>
                            {/* title */}
                            <Typography variant='inherit' sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontWeight: 500,
                            }}>{event.title}</Typography>

                            {/* InterViewer */}
                            <Typography variant='inherit' sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>InterViewer: {event.extendedProps?.data?.[0]?.user_det?.handled_by?.firstName}</Typography>

                            {/* time */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <Typography variant='inherit'>Time: {dayjs(data.extendedProps?.data?.[0]?.start).format('hh:mm A')}</Typography> - <Typography variant='inherit' sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}  >{dayjs(data.extendedProps?.data?.[0]?.end).format('hh:mm A')}</Typography>

                            </Box>

                        </Box>
                    </Box>
                </Badge>
            </HtmlTooltip>

            {/* dialog Model */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={eventDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    InterViewer: {dialogData?.user_det?.handled_by?.firstName}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <Grid container spacing={4} padding={2} direction="column"
                                sx={{
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                }}>
                                <Grid item xs={12}><Typography variant='body2' textTransform={'capitalize'}>Position: {dialogData?.job_id?.jobRequest_Role}</Typography></Grid>
                                <Grid item xs={12}><Typography variant='body2' textTransform={'capitalize'}>Created By: {dialogData?.user_det?.handled_by?.firstName}</Typography></Grid>
                                <Grid item xs={12}><Typography variant='body2' textTransform={'capitalize'}>InterViewer date: {dayjs(dialogData?.start).format('DD MMM YYYY')}</Typography></Grid>
                                <Grid item xs={12}><Typography variant='body2' textTransform={'capitalize'}>InterViewer Time: {dayjs(dialogData?.start).format('hh:mm A')}</Typography></Grid>
                                <Grid item xs={12}><Typography variant='body2' textTransform={'capitalize'}>Position: {dialogData?.job_id?.jobRequest_Role}</Typography></Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='outlined'  
                                    sx={{
                                        textTransform: 'none'
                                    }}
                                    endIcon={<>
                                        <RemoveRedEyeRounded />
                                        <GetApp />
                                        </>}>Resume.docx</Button>
                                    <Button sx={{ mt: 1,textTransform: 'none' }} fullWidth variant='outlined'  
                                    endIcon={<>
                                        <RemoveRedEyeRounded />
                                        <GetApp />
                                        </>}>Aadhar Card</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={6} sx={{ borderLeft: '1px solid black', }}>
                            <Grid container spacing={2} direction={'column'}
                                sx={{

                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: '70px'
                                }}>
                                {/* <Grid item xs={12}> */}
                                {/* <Typography variant='body1' textTransform={'capitalize'}>Meeting</Typography> */}
                                <GoogleMeet />


                                {/* </Grid> */}
                                <Grid item xs={12}>
                                    <Button variant='contained' onClick={() => { window.open(dialogData?.link, "_blank") }}>Join</Button>
                                </Grid>
                            </Grid>
                        </Grid >
                    </Grid>
                </DialogContent>
            </BootstrapDialog>

        </>
    )
}

export default Event