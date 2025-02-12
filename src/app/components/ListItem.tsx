interface ListItemProps {
    text: string;
}

export const ListItem = ({text}: ListItemProps) => {

    return (
        <li className="flex">
            <span className="mr-2 text-[#d1a756]">•</span>
            <span>{text}</span>
        </li>
    )
}