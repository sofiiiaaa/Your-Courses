import React, {ReactElement} from 'react';
// @ts-ignore
import { HashLink as Link } from 'react-router-hash-link';


function parseToc(toc: string): ReactElement[] {
    const lines = toc.split('\n');

    const getInfo = (line: string) => {
        const spacesMatch = line.match(/^(\s*)/);
        const nameMatch = line.match(/\[(.*?)\]/);
        const linkMatch = line.match(/\(#(.*?)\)/);

        if (spacesMatch && nameMatch && linkMatch) {
            return [spacesMatch[1].length / 2, nameMatch[1], linkMatch[1]];
        }
    }

    let renderedToc: ReactElement[] = [];
    let currentLevel = -1;
    let currentList: ReactElement[] = [];
    let parentLists: ReactElement[][] = [renderedToc];
    let i=0;
    lines.forEach(line => {
        if (line.trim() === '') {
            return;
        }

        let info = getInfo(line);
        if (info) {
            let [level, name, link] = info;
            if (level > 3) {
                return
            }

            while (currentLevel < level) {
                const newList: ReactElement[] = [];
                parentLists[currentLevel + 1].push(<ul key={`ul-${i++}`}>{newList} </ul>);
                parentLists.push(newList);
                currentList = newList;
                currentLevel++;
            }

            while (currentLevel > level) {
                parentLists.pop();
                currentList = parentLists[parentLists.length - 1];
                currentLevel--;
            }

            currentList.push(
                <li className={`toc-level-${level}`} key={`toc-${name}`}>
                    <Link to={`#${link}`}>{name}</Link>
                </li>
            );
        }
    });

    return renderedToc;
}


export default parseToc;
