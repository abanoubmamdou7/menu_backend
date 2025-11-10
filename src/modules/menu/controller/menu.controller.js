import { asyncHandler } from "../../../utils/errorHandling.js";
import ItemTransferService from "../itemTransferService.js";

export const item = asyncHandler(async (req, res) => {
  try {
    const { branch_code } = req.body;
    if (!branch_code) {
      return res.status(400).json({
        success: false,
        message: "Branch code is required",
      });
    }
    const result = await ItemTransferService.transferItemMaster(branch_code);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to transfer items",
      error: error.message,
    });
  }
});

export const groups = asyncHandler(async (req, res) => {
  try {
    const { branch_code } = req.body;
    if (!branch_code) {
      return res.status(400).json({
        success: false,
        message: "Branch code is required",
      });
    }
    const result = await ItemTransferService.transferItemMainGroups(branch_code);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to transfer item groups",
      error: error.message,
    });
  }
});

export const AllItems = asyncHandler(async (req, res) => {
  try {
    const { branch_code } = req.body;
    if (!branch_code) {
      return res.status(400).json({
        success: false,
        message: "Branch code is required",
      });
    }
    const result = await ItemTransferService.transferAllItems(branch_code);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to transfer all item data",
      error: error.message,
    });
  }
});