// const gems = [
//   {
//     folder: 'school',
//     title: 'Electronic library. Download books free. Finding books',
//     id: '5c61945137cac63145312ebb',
//     href: 'https://b-ok.xyz/',
//     displayUrl: 'b-ok.xyz',
//     tags: [],
//     favorite: true
//   },
//   {
//     folder: 'school',
//     title: 'Library Genesis',
//     id: '5c6150336e68ba674f2736f8',
//     href: 'http://gen.lib.rus.ec/',
//     displayUrl: 'gen.lib.rus.ec',
//     tags: [],
//     favorite: true
//   },
//   {
//     title:
//       'Subiecte BAC Informatica 2009 - Teorie, probleme, algoritmi - Invata Info',
//     id: '5c611acf8c46fc350d455711',
//     href: 'https://invata.info/2016/08/11/subiecte-bac-informatica-2009/',
//     displayUrl: 'invata.info',
//     tags: ['bac'],
//     favorite: true
//   },
//   {
//     folder: 'work',
//     title: 'Playground - SVGR',
//     id: '5c605e5ff91fa11a87f0f042',
//     href: 'https://www.smooth-code.com/open-source/svgr/playground/',
//     displayUrl: 'www.smooth-code.com',
//     tags: ['tool'],
//     favorite: false
//   }
// ]

// const folders = [
//   { id: 'school', title: 'School stuff' },
//   { id: 'work', title: 'Work stuff' }
// ]

// export default function PG() {
//   const [dragState, setDragState] = useState(null)
//   const [gemState, setGemState] = useState(gems)
//   const [outsideFolderState, setOutsideFolderState] = useState(true)

//   const renderedFolders = folders.map(f => (
//     <Folder
//       key={f.id}
//       {...f}
//       onDragOver={e => {
//         e.preventDefault()
//         setOutsideFolderState(false)
//       }}
//       onDragLeave={e => {
//         e.preventDefault()
//         setOutsideFolderState(true)
//       }}
//       onDrop={() => {
//         if (!dragState) return

//         gemState[gemState.findIndex(g => g.id === dragState)].folder = f.id
//         setGemState([...gemState])
//       }}
//     >
//       {gemState
//         .filter(({ folder }) => folder === f.id)
//         .map(gem => (
//           <Gem
//             key={gem.id}
//             {...gem}
//             onDrag={() => setDragState(gem.id)}
//             onDragEnd={() => {
//               if (outsideFolderState) {
//                 gemState[gemState.findIndex(g => g.id === dragState)].folder =
//                   ''
//                 setGemState([...gemState])
//               }
//             }}
//           />
//         ))}
//     </Folder>
//   ))

//   return (
//     <Container>
//       {renderedFolders}
//       {gemState
//         .filter(({ folder }) => !folder)
//         .map(gem => (
//           <Gem key={gem.id} {...gem} onDrag={() => setDragState(gem.id)} />
//         ))}
//     </Container>
//   )
// }
