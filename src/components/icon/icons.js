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

    case 'file':
      return {
        svg: '/icons/file.svg',
        rotation: 0
      }
    
    case 'download':
      return {
        svg: '/icons/download.svg',
        rotation: 0
      }

    case 'info':
      return {
        svg: '/icons/info.svg',
        rotation: 0
      }

    case 'github':
      return {
        svg: '/icons/github.svg',
        rotation: 0
      }

    case 'x':
      return {
        svg: '/icons/x.svg',
        rotation: 0
      }

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
    
    case 'chevron-left':
      return {
        svg: '/icons/chevron.svg',
        rotation: 90
      };
    
    case 'chevron-up':
      return {
        svg: '/icons/chevron.svg',
        rotation: 180
      };
    
    case 'caret-down':
      return {
        svg: '/icons/caret.svg',
        rotation: -90
      };

    case 'caret-right':
      return {
        svg: '/icons/caret.svg',
        rotation: 0
      };
    
    case 'caret-left':
      return {
        svg: '/icons/caret.svg',
        rotation: 180
      };
    
    case 'caret-up':
      return {
        svg: '/icons/caret.svg',
        rotation: 90
      };

    default:
      return null;
  }
}