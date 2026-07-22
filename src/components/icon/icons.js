export function getIcon(name) {
  switch (name) {
    case 'laptop':
      return {
        svg: '/icons/laptop.svg',
        rotation: 0
      };
    
    case 'folder':
      return {
        svg: '/icons/folder.svg',
        rotation: 0
      };

    case 'chevron-down':
      return {
        svg: '/icons/chevron.svg',
        rotation: 0
      };

    case 'chevron-right':
      return {
        svg: '/icons/chevron.svg',
        rotation: -90
      };

    default:
      return null;
  }
}