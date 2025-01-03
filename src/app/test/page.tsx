'use client'
import React, { useEffect, useState} from 'react';

import {Stack, styled} from "@mui/system";
import {Box, Button, Paper, Table, TableCell, TableContainer, TableRow} from "@mui/material";
import {useHandlers} from "@/app/test/useHandlers";
import Loader from "@/components/Loader/loader";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    // @ts-ignore
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export type gridItem={
    index1:number,
    index2:number,
    status:string
}

const Test: React.FC = () => {
    const [start, setStart] = useState<number[]>([]);
    const [end, setEnd] = useState<number[]>([]);
    const [selection, setSelection] = useState('none')
    const [arr, setArr] = useState<gridItem[][]>([]);
    const [modifyArr, setModifyArr] = useState<gridItem[][]>([])
    const {createMap, searchPath1, searchPath2} = useHandlers();
    const [isMounted,setMounted]=useState(false);
    const [timeSearchPath,setTimeSearchPath]=useState<null|string>(null);
    const [path,setPath]=useState([]);
    useEffect(() => {
        generatedMap();
    }, []);
    useEffect(() => {
        setMounted(true);
        const time = new Date().getTime();
        let tmpArr = structuredClone(arr);
        if (start.length && end.length) {
            Promise.all(
                [
                    searchPath1(arr, start.toString(), end.toString()),
                    // searchPath2(arr, start.toString(), end.toString())
                ]
            ).then(res => {
                const newPath=res[0].map((a:string) => a.split(',').map(Number));
                newPath.forEach((a:number[]) => {
                    tmpArr[a[0]][a[1]].status = 'way'
                });
                setPath(newPath);
                setTimeSearchPath((new Date().getTime()-time).toString());
                /*
                  Array.from(res[1]).map(a => a.split(',').map(Number)).forEach(a => {
                             tmpArr[a[0]][a[1]].status = 'way2'
                         })
                         */
                setModifyArr(tmpArr);
                setMounted(false);
            })
        } else {
            setModifyArr(tmpArr);
            setMounted(false);
        }
    }, [arr, start, end]);

    useEffect(() => {
        if (selection === 'start') {
            setStart([]);
        } else if (selection === 'end') {
            setEnd([]);
        }
        return;
    }, [selection]);

    const setCord = (cord: number[]) => {
        if (selection === 'start') {
            setStart(cord)
        } else if (selection === 'end') {
            setEnd(cord)
        }
    }
    const startSelectionStart=()=>{
        setSelection('start')
    }
    const startSelectionEnd=()=>{
        setSelection('end')
    }
    const generatedMap=()=>{
        setArr(createMap);
    }

    return (
        <Stack>
            <Stack sx={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                    variant={"contained"}
                    onClick={startSelectionStart}>
                    {start.length ? `you start:${start}` : 'Click to select start'}
                </Button>
                <Button
                    variant={"contained"}
                    onClick={generatedMap}>
                    refresh map
                </Button>
                <Button
                    variant={"contained"}
                    onClick={startSelectionEnd}>
                    {end.length ? `you end:${end}` : 'Click to select end'}
                </Button>
            </Stack>
            <Stack sx={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Item>{`score: ${path.length}`}</Item>
                <Item>{`time: ${timeSearchPath}`}</Item>
            </Stack>
            <Box display='flex'>
            <TableContainer component={Paper} sx={{height: '90vh', width: '100%', padding: '50px'}}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">{
                    modifyArr.map((arr1, indexRow) =>
                        <TableRow key={`column-${indexRow}`}>{
                            arr1.map((item, indexCol) =>
                                <TableCell
                                    onClick={() => setCord([indexRow, indexCol])}
                                    key={`column-${indexCol}`}
                                    sx={{
                                        border: '1px solid black',
                                        padding: 0,
                                        height: '7px',
                                        width: '3px',
                                        backgroundColor: item.status === 'block' ?
                                            'black' : item.status === 'way' ?
                                                'green' : item.status === 'way2' ?
                                                    'blue' : 'white'
                                    }}>
                                    <Item>

                                    </Item>
                                </TableCell>
                            )
                        }</TableRow>
                    )
                }
                </Table>
            </TableContainer>
                {isMounted&&<Loader/>}

            </Box>
        </Stack>
    );
}


export default Test;