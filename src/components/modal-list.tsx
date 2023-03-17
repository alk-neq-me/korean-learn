import { Modal, Text, HStack, Checkbox } from "native-base";
import { useStateContext } from "../context";
import { updateSettings } from "../context/actions/settings.actions";
import { SettingsState, UnpackType } from "../context/type";
import { ModalListState } from "../screens/Setting";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  header: ModalListState["header"];
  rows: Array<string>;
}

export default function ModalList(props: Props) {
  const { isOpen, header, onClose, rows } = props;

  const {
    state: {
      settings: {
        setting: {
          font_size,
          schedule,
          native_text_color,
        }
      }
    },
    dispatch
  } = useStateContext();

  const getIsChecked = (header: ModalListState["header"], row: string): boolean => {
    if (header === "Schedule") {
      if (row === schedule) return true;
    }
    if (header === "Font_Size") {
      if (row === font_size) return true;
    }
    if (header === "Native_Color") {
      if (row === native_text_color) return true;
    }
    return false;
  };

  const handleOnChange = (header: ModalListState["header"], row: string) => () => {
    let newSettings: Partial<UnpackType<SettingsState, "setting">> = {};
    type typedRow = UnpackType<SettingsState, "setting">;
    switch (header) {
      case "Font_Size":
        newSettings = { font_size: row as typedRow["font_size"] };
        dispatch(updateSettings(newSettings));
        return;
      case "Schedule":
        newSettings = { schedule: row as typedRow["schedule"] };
        dispatch(updateSettings(newSettings));
        return;
      case "Native_Color":
        newSettings = { native_text_color: row as typedRow["native_text_color"] };
        dispatch(updateSettings(newSettings));
        return;
      case "Show_Romaji":
        dispatch(updateSettings(newSettings));
        return;
      default:
        let _unreachable: never = header;
        console.warn({ _unreachable });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>
          {rows.map((item, index) => (
            <HStack key={index} space={3} p={1}>
              <Checkbox isChecked={getIsChecked(header, item)} value={item} accessibilityLabel="modal checkbox" onChange={handleOnChange(header, item)}>
                <Text w="full" fontSize="lg">{item}</Text>
              </Checkbox>
            </HStack>
          ))}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
};
