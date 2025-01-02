import {useCallback, useMemo} from "react";

const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1] // Включаем диагональные направления
];

export function useHandlers(): any {
    const createMap = useCallback(() => {
        let tmpArr1 = [];
        for (let i1 = 0; i1 < 100; i1++) {
            let tmpArr2 = [];
            for (let i2 = 0; i2 < 100; i2++)
                tmpArr2.push({
                    index1: i1,
                    index2: i2,
                    status: Math.random() * 100 < 20 ? 'block' : 'none',
                })
            tmpArr1.push(tmpArr2)
        }
        return tmpArr1
    }, [])
    const searchPath1 = useCallback(async (grid, start, end) => {
        const openPath = new Set(),
            path = {},
            pathScore = {},
            fullPathScore = {};

        openPath.add(start.toString());
        pathScore[start] = 0;
        fullPathScore[start] = heuristic(start, end);

        while (openPath.size > 0) {
            let current = Array.from(openPath).reduce((lowest, cell) => {
                return (fullPathScore[cell] < fullPathScore[lowest] ? cell : lowest);
            });

            if (current === end.toString()) {
                return reconstructPath(path, current);
            }

            openPath.delete(current);

            for (let variant of getVariants(current, grid)) {
                const tentativeGScore = pathScore[current] + 1;

                if (!(variant in pathScore) || tentativeGScore < pathScore[variant]) {
                    path[variant] = current;
                    pathScore[variant] = tentativeGScore;
                    fullPathScore[variant] = pathScore[variant] + heuristic(variant, end);

                    openPath.add(variant);
                }
            }
        }

        return [];
    }, [])

    const searchPath2 = useCallback(async (grid, start, end) => {

        const firstAnswer: any = search(grid, end, {
            cord: start,
            path: new Set().add(start)
        });
        if (firstAnswer.result) {
            return firstAnswer.path
        }
        let arr = firstAnswer.promises
        do {
            let tmpArr = [];
            for (let i in arr) {
                const answer: any = search(grid, end, arr[i]);
                if (answer.result) {
                    return answer.path;
                } else
                    tmpArr = tmpArr.concat(answer.promises);
            }
            arr = tmpArr;
        } while (arr.length)
    }, [])

    function search(grid, end, {cord, path}) {
        if (cord === end)
            return {result: true, path: new Set([cord, ...path])}
        const [x, y] = cord.split(',').map(Number);
        const promise = [];
        for (const [dx, dy] of directions) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[0].length && grid[nx][ny].status == 'none' && !path.has([nx, ny].toString())) {
                promise.push({cord: [nx, ny].toString(), path: new Set([([nx, ny]).toString(), ...path])})
            }
        }
        return {result: false, promises: promise}
    }

    function heuristic(a, b) {
        const [x1, y1] = a.split(',').map(Number);
        const [x2, y2] = b.split(',').map(Number);
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    function getVariants(cell, grid) {
        const variants = [];
        const [x, y] = cell.split(',').map(Number);


        for (const [dx, dy] of directions) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[0].length && grid[nx][ny].status == 'none') {
                variants.push(`${nx},${ny}`);
            }
        }
        return variants;
    }

    function reconstructPath(path, current) {
        const totalPath = [current];
        while (current in path) {
            current = path[current];
            totalPath.push(current);
        }
        return totalPath.reverse();
    }

    return {createMap, searchPath1, searchPath2};
}