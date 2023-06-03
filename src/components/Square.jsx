
export const Square = ({ children, isSelected, updateBoardy, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;
    const handleclick = () => {
      updateBoardy(index);
    }
    return (
      <div onClick={handleclick} className={className}>
        {children}
      </div>
    )
  }
  