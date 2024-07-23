interface MenuMainProps {
    nome: string;
    local: string;
}

const MenuMain: React.FC<MenuMainProps> = ({ nome , local}) => {
    return(
        <li className="p-3 w-full h-24 flex items-center justify-center bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
            <a href = {local} className="block text-xl font-semibold w-full h-full flex items-center justify-center">
            {nome}
            </a>
        </li>
    )
}

export default MenuMain;